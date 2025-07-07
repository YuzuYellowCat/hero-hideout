import React from "react";
// import "./index.css";
import { PostProvider } from "contexts/PostContext";
import PostGrid from "components/PostGrid";

type PostControllerProps = {};

const PostController: React.FC<PostControllerProps> = () => {
    return (
        <PostProvider>
            <PostGrid />
        </PostProvider>
    );
};

export default PostController;
