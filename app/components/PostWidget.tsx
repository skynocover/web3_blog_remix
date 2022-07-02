import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from '@remix-run/react';
import { AppContext } from '~/AppContext';

const PostWidget = () => {
  const appCtx = React.useContext(AppContext);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);

  const slug = undefined;

  const init = async () => {
    let posts: any[] = [];
    for (let i = appCtx.counter; i >= 0; i--) {
      console.log({ temp: appCtx.provider?.network });
      const post = await appCtx.contract?.getPost(i);

      posts.push({
        slug: i.toString(),
        title: post.title,
        author: post.author,
      });
    }
    setRecentPosts(posts);
  };

  useEffect(() => {
    if (appCtx.contract && appCtx.provider) {
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appCtx.contract]);

  return (
    <div className="p-8 mb-8 bg-white rounded-lg shadow-lg">
      <h3 className="pb-4 mb-8 text-xl font-semibold border-b">
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {appCtx.networkError && <p className="text-red-500">Change Your net work to Rinkeby</p>}
      {recentPosts.map((post: any) => (
        <div key={post.title} className="flex items-center w-full mb-4">
          {/* <div className="flex-none w-16">
        <img
          alt={post.title}
          height="60px"
          width="60px"
          className="align-middle rounded-full"
          src={'https://picsum.photos/60/60'}
        />
      </div> */}
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">
              {moment(post.createdAt).format('DD, MMM, YYYY')}
            </p>
            <Link to={`/posts/${post.slug}`} className="text-md" key={post.title}>
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
