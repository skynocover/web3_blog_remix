import React from 'react';
import MdEditor from 'react-markdown-editor-lite';
import { marked } from 'marked';

import PostAuthor from '~/components/PostAuthorGadget';
import type { Post } from '~/modal/post.dao';

const PostDetail = ({ post }: { post: Post }) => {
  return (
    <div className="pb-12 mb-8 bg-white rounded-lg shadow-lg lg:p-8">
      <div className="relative mb-6 overflow-hidden shadow-md">
        <img
          src={post.coverURL}
          alt={post.title}
          className="object-top w-full h-full rounded-t-lg"
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center w-full mb-8">
          <PostAuthor post={post} />
        </div>
        <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
        <MdEditor
          view={{ menu: false, md: false, html: true }}
          value={post.content}
          renderHTML={(text) => marked(post.content)}
        />
      </div>
    </div>
  );
};

export default PostDetail;
