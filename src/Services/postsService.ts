import { findAllPosts, insertPost } from '../Models/posts.model';
import { PaginationParams } from '../Types/api';
import { CreatePostBody, Post } from '../Types/posts';

export const getAllPosts = async (username: string, paginationParams: PaginationParams) =>
  await findAllPosts(username, paginationParams);

export const createPost = async (
  username: string,
  createPostBody: CreatePostBody
): Promise<Post> => {
  return await insertPost({
    username,
    ...createPostBody,
  });
};
