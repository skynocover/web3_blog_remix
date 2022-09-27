import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node'; // or "@remix-run/cloudflare"
import { useLoaderData } from '@remix-run/react';

import { PostCard } from '~/components';
import { getCounter, getPostByPage } from '~/modal/contract.server';

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '0';
    const pageNumber = isNaN(+page) ? 0 : +page;

    const counter = await getCounter();

    const posts = await getPostByPage(counter, pageNumber);

    return json({ posts });
  } catch (error: any) {
    console.log(error.message);
    return json({ posts: [] });
  }
};
export default () => {
  const { posts } = useLoaderData();

  return (
    <>
      {posts.map((post: any) => (
        <PostCard post={post} key={post.title} />
      ))}
    </>
  );
};
