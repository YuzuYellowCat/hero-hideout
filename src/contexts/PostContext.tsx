import React from "react";
import fetch from "utils/fetch";

let _postCache: Map<String, Character> = new Map();

export const PostContext =
    React.createContext<Map<String, Character>>(_postCache);

export const PostProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [posts, setPosts] =
        React.useState<Map<String, Character>>(_postCache);
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
                console.log(posts);
                const postMap = new Map<String, Character>();
                for (const character of posts) {
                    postMap.set(character.CharacterId, {
                        characterId: character.CharacterId,
                        name: character.Name,
                        color: character.Color,
                        image: character.ImageName,
                        isGuest: !!character.IsGuest,
                    });
                }
                _postCache = postMap;
                setPosts(posts);
            });
    }, []);

    return (
        <PostContext.Provider value={posts}>{children}</PostContext.Provider>
    );
};
