import React from "react";
// import "./index.css";
import { PostContext } from "contexts/PostContext";

type PostGridProps = {};

const PostGrid: React.FC<PostGridProps> = () => {
    const posts = React.useContext(PostContext);
    return (
        <ul>
            {Array.from(posts.values()).map((post) => {
                return (
                    <li>
                        {post.title} | {post.date.toDateString()}
                    </li>
                );
            })}
        </ul>
    );
};

export default PostGrid;
