import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from '@remix-run/react';

// import { getRecentPosts, getSimilarPosts } from '../services';

const PostWidget = ({ categories, slug }: any) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    // if (slug) {
    //   getSimilarPosts(categories, slug).then((result) => {
    //     setRelatedPosts(result);
    //   });
    // } else {
    //   getRecentPosts().then((result) => {
    //     setRelatedPosts(result);
    //   });
    // }
  }, [slug]);

  return (
    <div className="p-8 mb-8 bg-white rounded-lg shadow-lg">
      <h3 className="pb-4 mb-8 text-xl font-semibold border-b">
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {relatedPosts.map((post: any) => (
        <div key={post.title} className="flex items-center w-full mb-4">
          <div className="flex-none w-16">
            <img
              alt={post.title}
              height="60px"
              width="60px"
              className="align-middle rounded-full"
              src={post.featuredImage.url}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">
              {moment(post.createdAt).format('DD, MMM, YYYY')}
            </p>
            <Link to={`/post/${post.slug}`} className="text-md" key={post.title}>
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
