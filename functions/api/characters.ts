import {
    jsonResponse,
    invalidInputResponse,
    optionsResponse,
} from "../utils/responses";
import { authWrapper } from "../utils/wrappers";
import { formDataValidator, Forms } from "../utils/validate";
import { convertBoolToDBBool } from "../utils/types";

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
    if (request.method === "OPTIONS") {
        return optionsResponse();
    }

    if (request.method === "GET") {
        const { searchParams } = new URL(request.url);
        const includeGuests = searchParams.has("all");

        const { results } = await env.DB.prepare(
            `SELECT * FROM Characters ${
                includeGuests ? "" : "WHERE IsGuest = 0"
            }`
        ).all();
        return jsonResponse(results);
    }

    if (request.method === "POST") {
        return authWrapper({ secret: env.AUTH, request }, async () => {
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
                    "INSERT INTO Characters (CharacterId, Name, Color, ImageName, IsGuest, CreditId) VALUES (?, ?, ?, ?, ?, ?)"
                )
                    .bind(
                        validatedFormData.characterId,
                        validatedFormData.name,
                        validatedFormData.color,
                        validatedFormData.file ? imageName : null,
                        convertBoolToDBBool(validatedFormData.isGuest),
                        validatedFormData.creditId ?? null
                    )
                    .all(),
                validatedFormData.file
                    ? env.IMAGES.put(imageName, validatedFormData.file)
                    : Promise.resolve(),
            ]);

            return jsonResponse({});
        });
    }
    return jsonResponse({});
};
