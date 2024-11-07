"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = exports.getAllPosts = void 0;
const posts_model_1 = require("../Models/posts.model");
const getAllPosts = async (username, paginationParams) => await (0, posts_model_1.findAllPosts)(username, paginationParams);
exports.getAllPosts = getAllPosts;
const createPost = async (username, createPostBody) => {
    return await (0, posts_model_1.insertPost)({
        username,
        ...createPostBody,
    });
};
exports.createPost = createPost;
