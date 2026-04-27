import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import ChatPage from "../pages/ChatPage";
export const router = createBrowserRouter([
    {
        path: "/Chat",
        element: <ChatPage/>
    },
    {
        path: "/Login",
        element: <LoginPage/>
    }
]);