import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initProductionGuard } from "./lib/production-guard";

// Initialize production hardening (strips builder elements, blocks unauthorized postMessages)
initProductionGuard();

createRoot(document.getElementById("root")!).render(<App />);
