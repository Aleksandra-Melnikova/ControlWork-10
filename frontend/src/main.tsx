import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import {ToastContainer} from "react-toastify";
import {Provider} from "react-redux";
import {store} from "./app/store.ts";
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <BrowserRouter>
        <ToastContainer />
        <App />
            </BrowserRouter>
    </Provider>,
);
