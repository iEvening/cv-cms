import load from "@/lib/load";

export async function getSecureMenuContent() {
    return await load({url: "/api/menu", options: {method: "GET"}});
}
