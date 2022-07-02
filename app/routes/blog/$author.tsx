import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { PostCard } from '~/components';
import { getAuthorPosts } from '~/modal/contract.server';
import React from 'react';

export const loader: LoaderFunction = async ({ params }) => {
  const posts = await getAuthorPosts(params.author || '');

  return json({ posts });
};

export default function PostSlug() {
  const { posts } = useLoaderData();
  return (
    <>
      {posts.map((post: any) => (
        <PostCard post={post} key={post.title} />
      ))}
    </>
  );
}
