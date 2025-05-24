import {
    jsonResponse,
    authErrorResponse,
    invalidInputResponse,
} from "../utils/responses";
import { isAuthorized } from "../utils/checkAuth";
import { formDataValidator, Forms } from "../utils/validate";

export const onRequest: PagesFunction<{
    DB: D1Database;
    AUTH: string;
    IMAGES: R2Bucket;
}> = async ({ request, env }) => {
    if (request.method === "GET") {
        const { results } = await env.DB.prepare(
            "SELECT * FROM Characters WHERE IsGuest = 0"
        ).all();
        return jsonResponse(results);
    }
    if (request.method === "OPTIONS") {
        return jsonResponse({});
    }

    if (!isAuthorized({ secret: env.AUTH, request })) {
        return authErrorResponse();
    }

    if (request.method === "POST") {
        let validatedFormData: CharactersPOST;
        try {
            const formData = await request.formData();
            validatedFormData = formDataValidator<CharactersPOST>(
                Forms.CHARACTER,
                formData
            );
        } catch {
            return invalidInputResponse();
        }
        const fileExtension = validatedFormData.file?.name.split(".").pop();
        const imageName = crypto.randomUUID() + "." + fileExtension;

        await Promise.all([
            env.DB.prepare(
                "INSERT INTO Characters (CharacterId, Name, Color, ImageName, IsGuest) VALUES (?, ?, ?, ?, ?)"
            )
                .bind(
                    validatedFormData.characterId,
                    validatedFormData.name,
                    validatedFormData.color,
                    validatedFormData.file ? imageName : null,
                    validatedFormData.isGuest ? 1 : 0
                )
                .all(),
            validatedFormData.file
                ? env.IMAGES.put(imageName, validatedFormData.file)
                : Promise.resolve(),
        ]);

        return jsonResponse({});
    }

    return jsonResponse({});
};
