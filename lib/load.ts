import {IResponse} from "@/data/Interfaces";
import {toast} from "react-toastify";

type TFetch = {
    url: string
    options: RequestInit
    data?: any
}

export default async function load<T extends IResponse>({url, options, data}: TFetch): Promise<T> {

    try {
        const res = await fetch(url, {
            ...options,
            body: ((options.method === "POST" || options.method === "DELETE" || options.method === "PUT") && (!!data)) ? JSON.stringify(data) : null,
        });

        if (res?.status === 200) {
            return res.json();
        } else if (res?.status === 401) {
            throw new Error("(401) You are not authorized to view this page!");
        } else if (res?.status === 404) {
            throw new Error("(404) The requested page is not found!");
        } else if (res?.status === 400) {
            throw new Error("(400) The request is not valid!");
        } else if (res?.status === 418) {
            throw new Error("(418) I'm a teapot... (Unexpected behaviour)");
        } else if (res?.status === 500) {
            throw new Error("Database operation failed!")
        } else {
            throw new Error("An unexpected error happened...");
        }

    } catch (e: any) {
        toast.error(e.message || `Something went wrong!`);
        throw new Error(e.message);
    }


}