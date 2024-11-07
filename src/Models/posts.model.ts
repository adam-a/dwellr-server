import { Knex } from 'knex';

import type { PaginationParams } from '../Types/api';
import { CreatePost, Post } from '../Types/posts';
import pg from './common';
import { POSTS_TABLE } from './vars';

export const posts = (pg: Knex) => {
  const findAllPosts = async (
    username: string,
    { offset, limit }: PaginationParams
  ): Promise<Post[]> =>
    await pg<Post>(POSTS_TABLE)
      .select('*')
      .returning('*')
      .offset(offset)
      .limit(limit)
      .orderBy('createdAt', 'desc');

  const insertPost = async (post: CreatePost): Promise<Post> =>
    await pg<Post>(POSTS_TABLE)
      .insert(post)
      .returning('*')
      .then((results) => {
        if (results.length < 1) throw Error('Failed to insert new post');
        else return results[0];
      });

  const deletePost = async (username: Post['username'], id: Post['id']) =>
    await pg<Post>(POSTS_TABLE).where({ username, id }).del();

  return {
    deletePost,
    findAllPosts,
    insertPost,
  };
};

export const { deletePost, findAllPosts, insertPost } = posts(pg);
