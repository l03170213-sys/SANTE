import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root")!;

declare global {
  interface Window {
    __APP_ROOT?: ReturnType<typeof createRoot>;
  }
}

if (!window.__APP_ROOT) {
  window.__APP_ROOT = createRoot(container);
}

window.__APP_ROOT.render(<App />);
