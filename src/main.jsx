import { StrictMode } from "react";
import { Toaster } from "react-hot-toast";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store.js";
import { BrowserRouter } from "react-router";
import ScrollToTop from "./components/common/ScrollToTop.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <ScrollToTop />
        <ReduxProvider store={store}>
            <App />

            <Toaster
                containerStyle={{
                    zIndex: 999999999999,
                    textTransform: "capitalize",
                }}
            />
        </ReduxProvider>
    </BrowserRouter>
);
