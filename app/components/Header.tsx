import { Link } from '@remix-run/react';

const Header = () => {
  return (
    <div className="container px-10 mx-auto mb-8">
      <div className="inline-block w-full py-8 border-b border-blue-400">
        <div className="block md:float-left ">
          <Link to="/">
            <span className="text-4xl font-bold text-white cursor-pointer">Ether Log</span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          <Link to="/newpost">
            <span className="mt-2 ml-4 font-semibold text-white align-middle cursor-pointer md:float-right">
              Create New Post
            </span>
          </Link>
          <span className="mt-2 ml-4 font-semibold text-white align-middle cursor-pointer md:float-right">
            <a
              href="https://goerli.etherscan.io/address/0xfab5a9918537f7257f47b1fe0fba2e6155823d8d"
              target="_blank"
              rel="noreferrer"
            >
              Contract
            </a>
          </span>

          <span className="mt-2 ml-4 font-semibold text-white align-middle cursor-pointer md:float-right">
            <a
              href="https://github.com/skynocover/web3_blog_remix"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
