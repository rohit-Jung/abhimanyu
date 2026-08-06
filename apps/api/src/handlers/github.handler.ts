import {
  githubCallbackInput,
  GithubCallbackInput,
  validateData,
  pullRequestWebookPayload,
  PullRequestWebhookPayload,
} from "@abhimanyu/contracts"
import { inngestClient, prReceivedEvent } from "@abhimanyu/inngest"
import {
  githubInstallationService,
  githubPullRequestService,
} from "@abhimanyu/services"
import { Request, Response } from "express"

import { frontendUrl, getFrontendRedirectUrl } from "../utils"

export async function handleGithubAppCallback(req: Request, res: Response) {
  const data = validateData<GithubCallbackInput>(githubCallbackInput, req.query)

  // redirect for signin with callback
  if (!data.success) {
    const url = getFrontendRedirectUrl({
      installationId: req.query["installation_id"] as string,
    })

    return res.redirect(url)
  }

  const installationId = Number.parseInt(data.data.installation_id)
  await githubInstallationService.createGithubInstallation({
    installationId,
    userId: data.data.state,
  })

  return res.redirect(frontendUrl("/dashboard/github"))
}

const REVIEWABLE_ACTIONS = ["opened", "synchronize", "reopened"]

export async function handleGithubWebhook(req: Request, res: Response) {
  // so you need text to verify
  if (!req.body) return

  const body = (req.body as Buffer).toString("utf-8")
  const signature = req.headers["x-hub-signature-256"]
  const eventName = req.headers["x-github-event"]

  if (!signature || typeof signature != "string") {
    // handle this
    return
  }

  // invalid
  const isSignatureValid = await githubPullRequestService.isValidSignature({
    eventPayload: body,
    signature,
  })

  if (!isSignatureValid) {
    return res.status(401).json({ error: "invalid signature" })
  }

  // do not acknowedge other events
  if (eventName != "pull_request") {
    return res.status(200).json({ received: "true" })
  }

  const validatedData = validateData<PullRequestWebhookPayload>(
    pullRequestWebookPayload,
    JSON.parse(body)
  )

  if (!validatedData.success) {
    res.status(401).json({ error: validatedData.error })
    return
  }

  const pullRequestData = validatedData.data
  if (!REVIEWABLE_ACTIONS.includes(pullRequestData.action)) {
    return res.status(200).json({ received: "true" })
  }

  const pullRequest =
    await githubPullRequestService.savePullRequest(pullRequestData)

  // check if user can review
  const userId = await githubInstallationService.getUserIdByInstallationId({
    installationId: pullRequestData.installation.id,
  })

  if (!userId) {
    return res.status(401).json({
      error: "Not Authorized",
    })
  }

  // check user limit
  // const allowed = await canUserReview();

  // get the signature verify the signature
  await inngestClient.send(
    prReceivedEvent.create({
      pullRequestId: pullRequest.id,
    })
  )

  return res.status(200).json({
    received: true,
  })
}
