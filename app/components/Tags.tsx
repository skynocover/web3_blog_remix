import React, { useEffect } from 'react';
import { Link } from '@remix-run/react';

import { AppContext } from '~/AppContext';

export default function Tags() {
  const appCtx = React.useContext(AppContext);
  const [tags, setTags] = React.useState<string[]>([]);

  const init = async () => {
    if (appCtx.contract) {
      const tags = (await appCtx.contract.getAlltags()) || [];
      setTags(tags);
    }
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appCtx.contract]);

  return (
    <div className="p-8 pb-12 mb-8 bg-white rounded-lg shadow-lg">
      <h3 className="pb-4 mb-8 text-xl font-semibold border-b">Tags</h3>
      {appCtx.networkError && <p className="text-red-500">Change Your net work to Rinkeby</p>}
      {tags.map((category: any) => (
        <Link key={category} to={`/category/${category}`}>
          <span className="block pb-3 mb-3 cursor-pointer">{category}</span>
        </Link>
      ))}
    </div>
  );
}
