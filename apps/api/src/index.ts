import { app } from "./app"

const port = process.env.PORT ?? 4000

app.listen(port, () => {
  console.log("app is listening at", 4000)
})
