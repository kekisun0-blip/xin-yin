import { defineConfig, type Plugin, type PreviewServer } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

function devNoCachePlugin(): Plugin {
  function attach(server: { middlewares: { use: (fn: (req: { url?: string }, res: { setHeader: (k: string, v: string) => void }, next: () => void) => void) => void } }) {
    server.middlewares.use((req, res, next) => {
      const url = (req.url ?? "").split("?")[0] ?? ""
      if (url.startsWith("/src/") || url === "/index.html") {
        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        res.setHeader("Pragma", "no-cache")
      }
      next()
    })
  }
  return {
    name: "xinyin-dev-no-cache",
    configureServer(server) {
      attach(server)
    },
    configurePreviewServer(server: PreviewServer) {
      attach(server)
    },
  }
}

export default defineConfig({
  appType: "spa",
  base: process.env.GITHUB_PAGES === "true" ? "/xin-yin/" : "/",
  plugins: [react(), tailwindcss(), devNoCachePlugin()],
  server: {
    port: 5174,
    strictPort: true,
    headers: {
      "Cache-Control": "no-store, must-revalidate",
    },
  },
  preview: {
    port: 4174,
    strictPort: true,
    headers: {
      "Cache-Control": "no-store, must-revalidate",
    },
  },
})
