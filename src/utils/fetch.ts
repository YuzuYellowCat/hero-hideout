type FetchType = (endpoint: string, options: RequestInit) => Promise<Response>;

const myFetch: FetchType = (endpoint, options) => {
    return fetch(getEndpoint(endpoint), {
        headers: {
            ...options.headers,
        },
        ...options,
    });
};

export const getEndpoint: (endpoint: string) => string = (endpoint) => {
    return `${process.env.REACT_APP_ENDPOINT}/api${endpoint}`;
};

export const getImageUrl: (imageName: string) => string = (imageName) => {
    return getEndpoint(`/images/${imageName}`);
};

export default myFetch;
