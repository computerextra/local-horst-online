import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route
      path="/"
      element={<App />}>
      <Route
        index
        element={<>HOME</>}
      />
    </Route>,
    <Route
      path="Einkaufen"
      element={<App />}>
      <Route
        index
        element={<>Mitarbeiter Auswahl</>}
      />
      <Route
        path="Liste"
        element={<>Einkaufen Liste</>}
      />
      <Route
        path=":id"
        element={<>Einkauf bearbeiten</>}
      />
    </Route>,
  ])
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider
      router={router}
      fallbackElement={<>LOADING...</>}
    />
  </React.StrictMode>
);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
