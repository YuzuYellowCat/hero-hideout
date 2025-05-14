import { jsonResponse } from "../utils/jsonResponse";

export const onRequest = () => {
    return jsonResponse({ time: new Date().toISOString() });
};
