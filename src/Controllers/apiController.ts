import * as bodyParser from 'body-parser';
import {
  Body,
  Consumes,
  Controller,
  Get,
  Middlewares,
  Post,
  Query,
  Request,
  Route,
  Tags,
} from 'tsoa';

import { BadRequestError } from '../Errors/BadRequestError';
import { generatePostMetadata } from '../Services/openAiService';
import { createPost, getAllPosts } from '../Services/postsService';
import { getPresignedUploadUrl } from '../Services/s3Service';
import type { DescribeRequestBody, PresignResponse, Request as UserDetails } from '../Types/api';
import { CreatePostBody, Post as UserPost, PostMetadata } from '../Types/posts';

@Tags('api')
@Route('api')
@Middlewares(bodyParser.urlencoded({ extended: true }), bodyParser.json())
export class apiController extends Controller {
  @Post('/describe')
  public async generatePostMetadata(@Body() body: DescribeRequestBody): Promise<PostMetadata> {
    const { transcript } = body;

    const metadata = await generatePostMetadata(transcript);

    return metadata;
  }

  /**
   * Post presign
   * @param body
   * @param orgId
   */
  @Get('/presignedUrl')
  public async getPresignedUploadUrl(): Promise<PresignResponse> {
    return await getPresignedUploadUrl();
  }

  @Post('/createPost')
  public async createPost(
    @Request() request: UserDetails,
    @Body() body: CreatePostBody
  ): Promise<UserPost> {
    if (!request.user.username) {
      throw new BadRequestError('invalid user');
    }
    return await createPost(request.user.username, body);
  }

  @Get('/getPosts')
  @Consumes('application/json')
  public async getPosts(
    @Request() request: UserDetails,
    @Query() offset = 0,
    @Query() limit = 5
  ): Promise<UserPost[]> {
    if (isNaN(offset) || offset < 0) offset = 0;

    const posts = await getAllPosts(request.user.username, { offset, limit });
    console.log(posts);
    return posts;
  }
}
