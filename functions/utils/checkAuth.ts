type CheckAuthParams = {
    secret: string;
    request: Request;
};

export const isAuthorized = ({ secret, request }: CheckAuthParams) => {
    const requestAuth = request.headers.get("Authorization")?.split(" ")[1];
    return secret === requestAuth;
};
