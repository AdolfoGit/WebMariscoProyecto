import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "./context/index";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { UserProvider } from "./UserContext";
import * as Sentry from "@sentry/react";


// Inicializar Sentry (sin BrowserTracing)
Sentry.init({
  dsn: "https://74e30b135308e9bc61783ab47a169d7c@o4508292167958528.ingest.us.sentry.io/4508292169138176",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.browserProfilingIntegration(),
  ],
   // Tracing
   tracesSampleRate: 1.0, //  Capture 100% of the transactions
   // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled

   tracePropagationTargets: [
    /^https:\/\/pwa-alpha-blue\.vercel\.app/,
    /^https:\/\/api-beta-mocha-59\.vercel\.app/,
    "localhost", /^https:\/\/yourserver\.io\/api/
  ],
   profilesSampleRate: 1.0,
   environment: "production",
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <UserProvider>
      <MaterialTailwindControllerProvider>
        <App />
      </MaterialTailwindControllerProvider>
    </UserProvider>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

serviceWorkerRegistration.register({
  onUpdate: (registration) => {
    if (registration && registration.waiting) {
      const updateSW = () => {
        registration.waiting.postMessage({ type: "SKIP_WAITING" });
        window.location.reload();
      };

      // Muestra una notificación para cuando se detecten nuevas actualizaciones de la pagina
      if (window.confirm("Nueva versión disponible. ¿Deseas actualizar?")) {
        updateSW();
      }
    }
  },
});
