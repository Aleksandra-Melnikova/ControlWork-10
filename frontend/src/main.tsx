import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import {ToastContainer} from "react-toastify";
import {Provider} from "react-redux";
import {store} from "./app/store.ts";

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <ToastContainer />
        <App />
    </Provider>,
);
