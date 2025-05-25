import { authErrorResponse } from "./responses";

export type PagesFunctionWrapper<T extends [...args: any] = []> = (
    ...args: [...T, callback: () => Promise<Response> | Response]
) => Response | Promise<Response>;

const _isAuthorized = ({
    secret,
    request,
}: {
    secret: string;
    request: Request;
}) => {
    const requestAuth = request.headers.get("Authorization")?.split(" ")[1];
    return secret === requestAuth;
};

export const authWrapper: PagesFunctionWrapper<
    [
        authInfo: {
            secret: string;
            request: Request;
        }
    ]
> = (authInfo, callback: () => Promise<Response> | Response) => {
    if (!_isAuthorized(authInfo)) {
        return authErrorResponse();
    }
    return callback();
};
