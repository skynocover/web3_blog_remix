import React from 'react';
import { marked } from 'marked';
import MdEditor from 'react-markdown-editor-lite';
import { AppContext } from '~/AppContext';
import PostAuthor from '~/components/PostAuthorGadget';
import Switch from 'react-switch';

import Mint from '~/components/Mint';

export default function Index() {
  const appCtx = React.useContext(AppContext);

  const [content, setContent] = React.useState<string>('# Hello World!');
  const [author, setAuthor] = React.useState<string>('');

  const [title, setTitle] = React.useState<string>('Title');
  const [coverURL, setCoverURL] = React.useState<string>('https://picsum.photos/1000/500');
  const [show, setShow] = React.useState<boolean>(false);

  const [modalPop, setModalPop] = React.useState<boolean>(false);

  const mint = async () => {
    //
    setModalPop(true);
  };

  const init = async () => {
    if (appCtx.signer) {
      setAuthor(await appCtx.signer.getAddress());
    }
  };

  React.useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appCtx.signer]);

  return (
    <>
      <div>
        <div className="container px-5 mx-auto mb-2">
          <div className="flex items-center">
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                <span className="inline-flex items-center px-3 text-sm text-gray-400 bg-transparent rounded-l-md ">
                  @
                </span>
              </div>
              <input
                type="text"
                className="w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="relative flex items-center ml-2">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-6 h-6"
                  fill="gray"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                className="w-80 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={coverURL}
                onChange={(e) => setCoverURL(e.target.value)}
              />
            </div>
            <div className="flex-1" />

            <div className="flex items-center justify-center ">
              <Switch onChange={() => setShow(!show)} checked={show} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-12 mt-4 lg:grid-cols-12">
            <div className="col-span-1 lg:col-span-6">
              <MdEditor
                className="block w-full h-full p-2.5 text-sm  border border-gray-600 rounded-lg "
                view={{ menu: true, md: true, html: false }}
                value={content}
                renderHTML={(text) => {
                  setContent(text);
                  return marked(text);
                }}
              />
            </div>

            <div className="col-span-1 lg:col-span-6">
              <div className="relative lg:sticky top-8">
                <div className="pb-12 bg-white rounded-lg shadow-lg lg:p-4">
                  {show && (
                    <div className="relative mb-6 overflow-hidden shadow-md">
                      <img
                        src={coverURL}
                        alt={''}
                        className="object-top w-full h-full rounded-t-lg"
                      />
                    </div>
                  )}

                  <div className="px-4">
                    {show && (
                      <>
                        <div className="flex items-center w-full mb-8">
                          <PostAuthor post={{ author }} />
                        </div>
                        <h1 className="mb-8 text-3xl font-semibold">{title}</h1>
                      </>
                    )}

                    <div className="prose">
                      {content && (
                        <MdEditor
                          view={{ menu: false, md: false, html: true }}
                          value={content}
                          renderHTML={(text) => marked(text)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 mt-4 text-white transition duration-500 bg-teal-500 border border-teal-500 rounded-md select-none ease hover:bg-teal-600 focus:outline-none focus:shadow-outline"
                  onClick={mint}
                >
                  Mint
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modalPop && (
        <Mint
          post={{ slug: '', title, coverURL, author, content, tags: [], createdAt: 0 }}
          setModalPop={setModalPop}
        />
      )}
    </>
  );
}
