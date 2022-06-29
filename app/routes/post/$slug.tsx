import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import React from 'react';

import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
  Loader,
} from '../../components';
import { AdjacentPosts } from '../../sections';

export const loader: LoaderFunction = async ({ params }) => {
  //   const post = await getPost(params.slug);

  return json<any>({
    post: {
      slug: 'new slug',
      title: 'New title',
      featuredImage: { url: 'https://en.pimg.jp/066/591/114/1/66591114.jpg' },
      author: {
        name: 'New author',
        photo: {
          url: 'https://obs.line-scdn.net/0hwtqz96J5KFtMAz9rar9XDHRVJCp_ZTJSbmxvPmwBImtpL2hdcGB7OGwBJXcyZz0PbGA1aGxQcT40NmYJIg/w644',
        },
      },
      categories: [],
    },
  });
  //   return json<any>({ post, html });
};

export default function PostSlug() {
  const { post, html } = useLoaderData();
  return (
    <div className="container px-10 mx-auto mb-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <AdjacentPosts slug={post.slug} createdAt={post.createdAt} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget
              slug={post.slug}
              categories={post.categories.map((category: any) => category.slug)}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}
