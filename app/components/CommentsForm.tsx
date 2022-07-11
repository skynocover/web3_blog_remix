import React, { useRef, useState, useEffect } from 'react';

const CommentsForm = ({ slug }: any) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef<any>();
  const storeDataEl = useRef<any>();

  useEffect(() => {}, []);

  const handleCommentSubmission = () => {
    const { value: comment } = commentEl.current;
    const { checked: storeData } = storeDataEl.current;
    console.log({ comment, storeData });
  };

  return (
    <div className="p-8 pb-12 mb-8 bg-white rounded-lg shadow-lg">
      <h3 className="pb-4 mb-8 text-xl font-semibold border-b">Buy Author a Coffee</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={commentEl}
          className="w-full p-4 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Comment"
          name="comment"
        />
        <div className="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-4">
          <input
            className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
            placeholder="ether"
            name="ether"
          />
        </div>
      </div>

      <div className="mt-8">
        <button
          type="button"
          onClick={handleCommentSubmission}
          className="inline-block px-8 py-3 text-lg text-white transition duration-500 bg-pink-600 rounded-full cursor-pointer ease hover:bg-indigo-900"
        >
          Send Comment
        </button>

        {showSuccessMessage && (
          <span className="float-right mt-3 text-xl font-semibold text-green-500">
            Comment submitted for review
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
