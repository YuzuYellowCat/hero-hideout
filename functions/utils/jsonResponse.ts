import { Response, ResponseInit } from "@cloudflare/workers-types";

export const jsonResponse = (value: any, init: ResponseInit = {}) => {
    return new Response(JSON.stringify(value), {
        headers: { "Content-Type": "application/json", ...init.headers },
        ...init,
    });
};
