import React from 'react';

import { Link } from '@remix-run/react';
import PostAuthor from '~/components/PostAuthorGadget';
import type { Post } from '~/modal/post.dao';

export default function PostCard({ post }: { post: Post }) {
  const link = `/posts/${post.slug}`;
  return (
    <div className="p-0 pb-12 mb-8 bg-white rounded-lg shadow-lg lg:p-8">
      <div className="relative mb-6 overflow-hidden shadow-md pb-80">
        <img
          src={post.coverURL}
          alt={post.title}
          className="absolute object-cover object-top w-full rounded-t-lg shadow-lg h-80 lg:rounded-lg"
        />
      </div>
      <h1 className="mb-8 text-3xl font-semibold text-center transition duration-300 cursor-pointer hover:text-pink-600">
        <Link to={link}>{post.title}</Link>
      </h1>
      <div className="items-center justify-center w-full mb-8 text-center bloc lg:flex">
        <PostAuthor post={post} />
      </div>
      <div className="text-center">
        <Link to={link}>
          <span className="inline-block px-8 py-3 text-lg font-medium text-white transition duration-500 transform bg-pink-600 rounded-full cursor-pointer hover:-translate-y-1">
            Continue Reading
          </span>
        </Link>
      </div>
    </div>
  );
}
