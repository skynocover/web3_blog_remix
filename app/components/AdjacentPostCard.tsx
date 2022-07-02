import React from 'react';

const AdjacentPostCard = ({ url, position }: { url: string; position: string }) => (
  <>
    <div className="absolute w-full h-24 bg-center rounded-lg opacity-50 bg-gradient-to-b from-gray-400 via-gray-700 to-black">
      <div className="absolute flex flex-col items-center justify-center w-full h-full p-4 rounded-lg">
        {position === 'LEFT' && (
          <svg
            className="w-full h-6 text-white svg-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              fill="none"
              d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"
            ></path>
          </svg>
        )}
        {position === 'RIGHT' && (
          <svg
            className="w-full h-6 text-white svg-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              fill="none"
              d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"
            ></path>
          </svg>
        )}
      </div>
      <a href={url}>
        <span className="absolute z-10 w-full h-full cursor-pointer" />
      </a>
    </div>
  </>
);

export default AdjacentPostCard;
