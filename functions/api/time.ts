import { jsonResponse } from "../utils/responses";

export const onRequest = () => {
    return jsonResponse({ time: new Date().toISOString() });
};
