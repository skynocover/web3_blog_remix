import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import type { Post } from '~/modal/post.dao';
import { PostDetail, Comments, CommentsForm } from '~/components';
import { getPost } from '~/modal/contract.server';

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.slug || isNaN(+params.slug)) {
    return {};
  }

  const post = await getPost(+params.slug);

  return json<Post | null>(post);
};

export default function PostSlug() {
  const post = useLoaderData();
  return (
    <>
      {post && (
        <>
          <PostDetail post={post} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </>
      )}
    </>
  );
}
