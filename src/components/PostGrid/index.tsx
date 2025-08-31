import React from "react";
import "./index.css";
import { PostContext } from "contexts/PostContext";
import PostGridItem from "components/PostGridItem";

type PostGridProps = {};

const PostGrid: React.FC<PostGridProps> = () => {
    const posts = React.useContext(PostContext);
    return (
        <div className="post-grid">
            {Array.from(posts.values()).map((post) => (
                <PostGridItem post={post} />
            ))}
        </div>
    );
};

export default PostGrid;
