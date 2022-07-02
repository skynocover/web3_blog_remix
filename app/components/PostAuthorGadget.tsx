import { Link } from '@remix-run/react';
import moment from 'moment';

export default function Index({ post }: any) {
  return (
    <>
      <Link to={`/blog/${post.author}`}>
        <div className="flex items-center w-full mb-4 mr-8 lg:mb-0 lg:w-auto">
          {/* <img
            alt={post.author}
            height="30px"
            width="30px"
            className="align-middle rounded-full"
            src={'https://picsum.photos/30/30'}
          /> */}
          <p className="inline ml-2 text-lg text-gray-700 align-middle">{post.author}</p>
        </div>
      </Link>
      <div className="font-medium text-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="inline w-6 h-6 mr-2 text-pink-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span>{moment(post.createdAt).format('DD, MMM, YYYY')}</span>
      </div>
    </>
  );
}
