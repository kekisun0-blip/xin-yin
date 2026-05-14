import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { XinYinView } from "./XinYinView"

document.getElementById("xinyin-boot-marker")?.remove()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="st-grain" aria-hidden />
    <div className="st-frame min-h-dvh">
      <XinYinView />
    </div>
  </StrictMode>,
)
