import {
  githubCallbackInput,
  GithubCallbackInput,
  validateData,
} from "@abhimanyu/contracts"
import { githubService } from "@abhimanyu/services"
import { Request, Response } from "express"

import { frontendUrl, getFrontendRedirectUrl } from "../utils"

export async function handleGithubAppCallback(req: Request, res: Response) {
  const data = validateData<GithubCallbackInput>(githubCallbackInput, req.query)
  console.log("got em", data)

  // redirect for signin with callback
  if (!data.success) {
    const url = getFrontendRedirectUrl({
      installationId: req.query["installation_id"] as string,
    })

    return res.redirect(url)
  }

  const installationId = Number.parseInt(data.data.installation_id)
  await githubService.createGithubInstallation({
    installationId,
    userId: data.data.state,
  })

  return res.redirect(frontendUrl("/dashboard"))
}
