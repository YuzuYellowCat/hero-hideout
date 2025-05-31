import { genericErrorResponse, jsonResponse } from "../../utils/responses";

export const onRequest: PagesFunction<Env> = async ({
    request,
    env,
    params,
}) => {
    if (request.method === "GET") {
        if (!params.credit || Array.isArray(params)) {
            return jsonResponse({});
        }

        try {
            const { results } = await env.DB.prepare(
                "SELECT * FROM Credits INNER JOIN CreditLinks ON Credits.CreditId = CreditLinks.CreditId WHERE Credits.CreditId = ?"
            )
                .bind(params.credit)
                .all();

            const links = {};
            results.forEach((result) => {
                links[result.Type as string] = result.Url;
            });

            const returnValue: Credit = {
                creditId: results.at(0).CreditId as string,
                name: results.at(0).Name as string,
                links,
            };

            return jsonResponse(returnValue);
        } catch (e) {
            console.error(e);
            return genericErrorResponse();
        }
    }
    return jsonResponse({});
};
