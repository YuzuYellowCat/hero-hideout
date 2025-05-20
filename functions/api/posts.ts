import {
    jsonResponse,
    authErrorResponse,
    invalidInputResponse,
} from "../utils/responses";
import { isAuthorized } from "../utils/checkAuth";

export const onRequest: PagesFunction<{
    DB: D1Database;
    AUTH: string;
    IMAGES: R2Bucket;
}> = async ({ request, env }) => {
    if (request.method === "GET") {
        const { results } = await env.DB.prepare(
            "SELECT * FROM Posts INNER JOIN PostImages ON Posts.PostId = PostImages.PostID"
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
        const formData = await request.formData();
        console.log(formData.get("file"));
        const file: any = formData.get("file");

        if (!(file instanceof File)) {
            return invalidInputResponse();
        }

        const fileExtension = file.name.split(".").pop();
        const imageName = crypto.randomUUID() + "." + fileExtension;

        const [{ results }] = await Promise.all([
            env.DB.prepare(
                "INSERT INTO Posts (Date, Title, Description, IsNSFW) VALUES (strftime('%s', 'now'), ?, ?, ?) RETURNING PostId"
            )
                .bind(
                    formData.get("name"),
                    formData.get("description"),
                    formData.get("isNSFW") === "false" ? 0 : 1
                )
                .all(),
            env.IMAGES.put(imageName, file),
        ]);

        const postId = results[0].PostId;

        await env.DB.prepare(
            "INSERT INTO PostImages (PostId, ImageName, AltText, IsCover) VALUES (?, ?, ?, ?)"
        )
            .bind(postId, imageName, "Test Alt Text", 1)
            .all();

        return jsonResponse({});
    }

    return jsonResponse({});
};
