import React from 'react';
import type { Post } from '~/modal/post.dao';
import { AppContext } from '~/AppContext';

export default function Mint({ post, setModalPop }: { post: Post; setModalPop: Function }) {
  const appCtx = React.useContext(AppContext);

  const [tags, setTags] = React.useState<string>('');

  const mint = async () => {
    const _tags = tags
      .split(',')
      .map((item) => item.trim())
      .filter((item) => !!item);
    if (appCtx.signer) {
      const tx = await appCtx.contract
        ?.connect(appCtx.signer)
        .post(post.title, post.coverURL, post.content, _tags);

      setModalPop(false);
    }
  };

  return (
    <>
      <div
        className="absolute top-0 bottom-0 left-0 right-0 z-10 py-12 transition duration-150 ease-in-out bg-gray-700"
        id="modal"
      >
        <div role="alert" className="container w-11/12 max-w-lg mx-auto md:w-2/3">
          <div className="relative px-5 py-8 bg-white border border-gray-400 rounded shadow-md md:px-10">
            <h1 className="mb-4 font-bold leading-tight tracking-normal text-gray-800 font-lg">
              Mint the post with {post.author}
            </h1>
            <label className="text-sm font-bold leading-tight tracking-normal text-gray-800">
              {post.title}
            </label>

            <div className="relative mb-6 overflow-hidden shadow-md">
              <img src={post.coverURL} alt={''} className="object-top w-full h-full rounded-t-lg" />
            </div>

            <label className="text-sm font-bold leading-tight tracking-normal text-gray-800">
              Tags: (Split by , )
            </label>
            <input
              id="name"
              className="flex items-center w-full h-10 pl-3 mt-2 mb-5 text-sm font-normal text-gray-600 border border-gray-300 rounded focus:outline-none focus:border focus:border-indigo-700"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />

            <div className="flex items-center justify-start w-full">
              <button
                onClick={mint}
                className="px-8 py-2 text-sm text-white transition duration-150 ease-in-out bg-indigo-700 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 hover:bg-indigo-600"
              >
                Mint
              </button>
              <button
                className="px-8 py-2 ml-3 text-sm text-gray-600 transition duration-150 ease-in-out bg-gray-100 border rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 hover:border-gray-400 hover:bg-gray-300"
                onClick={() => setModalPop(false)}
              >
                Cancel
              </button>
            </div>
            <button
              className="absolute top-0 right-0 mt-4 mr-5 text-gray-400 transition duration-150 ease-in-out rounded cursor-pointer hover:text-gray-600 focus:ring-2 focus:outline-none focus:ring-gray-600"
              onClick={() => setModalPop(false)}
              aria-label="close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-x"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
