import { PagesFunction } from "@cloudflare/workers-types";
import { jsonResponse } from "../utils/jsonResponse";

export const onRequestGet: PagesFunction = async () => {
    return jsonResponse({});
};
