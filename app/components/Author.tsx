import React from 'react';
import { Link } from '@remix-run/react';

const Author = ({ author }: any) => {
  return (
    <div className="relative p-12 mt-20 mb-8 text-center bg-black rounded-lg bg-opacity-20">
      <div className="absolute left-0 right-0 -top-14">
        {/* <img
          alt={author}
          height="30px"
          width="30px"
          className="align-middle rounded-full"
          src={'https://picsum.photos/30/30'}
        /> */}
      </div>
      <Link to={`blog/${author}`}>
        <h3 className="my-4 text-xl font-bold text-white">{author}</h3>
      </Link>
    </div>
  );
};

export default Author;
