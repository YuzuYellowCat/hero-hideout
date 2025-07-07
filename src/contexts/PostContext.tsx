import React from "react";
import fetch from "utils/fetch";

let _postCache: Map<String, Post> = new Map();

export const PostContext = React.createContext<Map<String, Post>>(_postCache);

export const PostProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [posts, setPosts] = React.useState<Map<String, Post>>(_postCache);
    React.useEffect(() => {
        if (_postCache.size > 0) {
            setPosts(_postCache);
            return;
        }
        fetch("/posts", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((posts) => {
                const postMap = new Map<String, Post>();
                for (const post of posts) {
                    postMap.set(post.PostId, {
                        postId: post.PostId,
                        title: post.Title,
                        description: post.Description,
                        isNSFW: !!post.IsNSFW,
                        type: post.Type,
                        altText: post.AltText,
                        imageName: post.ImageName,
                        date: new Date(post.Date * 1000),
                    });
                }
                _postCache = postMap;
                setPosts(postMap);
            });
    }, []);

    return (
        <PostContext.Provider value={posts}>{children}</PostContext.Provider>
    );
};
