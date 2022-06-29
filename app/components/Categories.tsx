import React, { useState, useEffect } from 'react';
import { Link } from '@remix-run/react';

// import { getCategories  } from '../services';

const Categories = () => {
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    // getCategories()
    //   .then((newCategories:any) => setCategories(newCategories))
  }, []);

  return (
    <div className="p-8 pb-12 mb-8 bg-white rounded-lg shadow-lg">
      <h3 className="pb-4 mb-8 text-xl font-semibold border-b">Categories</h3>
      {categories.map((category: any) => (
        <Link key={category.slug} to={`/category/${category.slug}`}>
          <span className="block pb-3 mb-3 cursor-pointer">{category.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
