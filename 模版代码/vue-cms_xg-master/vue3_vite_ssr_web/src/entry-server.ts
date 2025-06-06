import { createMemoryHistory } from 'vue-router'
import { renderToString } from 'vue/server-renderer'
import createApp from './main'
import createRouter from "./router"

const render = async (url: string) => {
  const app = createApp()

  const router = createRouter(createMemoryHistory())
  app.use(router)

  await router.push(url)

  const html = await renderToString(app)
  return html
}
export {
  render
}
