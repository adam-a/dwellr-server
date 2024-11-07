"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertPost = exports.findAllPosts = exports.deletePost = exports.posts = void 0;
const common_1 = __importDefault(require("./common"));
const vars_1 = require("./vars");
const posts = (pg) => {
    const findAllPosts = async (username, { offset, limit }) => await pg(vars_1.POSTS_TABLE).select('*').returning('*').offset(offset).limit(limit);
    const insertPost = async (post) => await pg(vars_1.POSTS_TABLE)
        .insert(post)
        .returning('*')
        .then((results) => {
        if (results.length < 1)
            throw Error('Failed to insert new post');
        else
            return results[0];
    });
    const deletePost = async (username, id) => await pg(vars_1.POSTS_TABLE).where({ username, id }).del();
    return {
        deletePost,
        findAllPosts,
        insertPost,
    };
};
exports.posts = posts;
_a = (0, exports.posts)(common_1.default), exports.deletePost = _a.deletePost, exports.findAllPosts = _a.findAllPosts, exports.insertPost = _a.insertPost;
