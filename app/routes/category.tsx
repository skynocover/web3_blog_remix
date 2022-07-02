import React from 'react';
import { Outlet } from '@remix-run/react';

import { Categories, PostWidget } from '~/components';

export default function Index() {
  return (
    <>
      <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
        <div className="container px-10 mx-auto mb-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="col-span-1 lg:col-span-8">
              <Outlet />
            </div>
            <div className="col-span-1 lg:col-span-4">
              <div className="relative lg:sticky top-8">
                <PostWidget />
                <Categories />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
