import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.scss";
import App from "./pages/App";

import Spinner from "./components/spinner";
import ErrorBoundary from "./components/error-boundary";
// import NotiStackWrapper from "./components/notistack-wrapper";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <BrowserRouter>
          {/* <NotiStackWrapper> */}
            <App />
          {/* </NotiStackWrapper> */}
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);
