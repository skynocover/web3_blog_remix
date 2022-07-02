import React, { useState, useEffect } from 'react';

import { AdjacentPostCard } from '../components';
import { AppContext } from '~/AppContext';
import config from '~/config.json';

const AdjacentPosts = () => {
  const appCtx = React.useContext(AppContext);

  const [adjacentPost, setAdjacentPost] = useState<any>({});

  useEffect(() => {
    if (appCtx.contract) {
      const url = new URL(window.location.href);
      const page = url.searchParams.get('page') || '0';
      const pageNumber = isNaN(+page) ? 0 : +page;

      let previous = '';
      let next = '';

      if (pageNumber < appCtx.counter / config.pageSize - 1) {
        next = '/posts?page=' + (pageNumber + 1).toString();
      }

      if (pageNumber > 0) {
        previous = '/posts?page=' + (pageNumber - 1).toString();
      }

      setAdjacentPost({ previous, next });
    }
  }, [appCtx.contract]);

  return (
    <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-8">
      <>
        {adjacentPost.previous && (
          <div
            className={`${
              adjacentPost.next ? 'col-span-1 lg:col-span-4' : 'col-span-1 lg:col-span-8'
            } adjacent-post rounded-lg relative h-24`}
          >
            <AdjacentPostCard url={adjacentPost.previous} position="LEFT" />
          </div>
        )}
        {adjacentPost.next && (
          <div
            className={`${
              adjacentPost.previous ? 'col-span-1 lg:col-span-4' : 'col-span-1 lg:col-span-8'
            } adjacent-post rounded-lg relative h-24`}
          >
            <AdjacentPostCard url={adjacentPost.next} position="RIGHT" />
          </div>
        )}
      </>
    </div>
  );
};

export default AdjacentPosts;
