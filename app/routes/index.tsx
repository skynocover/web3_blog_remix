import type { LoaderFunction, ActionFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node'; // or "@remix-run/cloudflare"
import { Form, useActionData, useLoaderData, useTransition } from '@remix-run/react';

import { PostCard, Categories, PostWidget, Layout } from '~/components';
// import { getPosts } from "../services"
import { FeaturedPosts } from '../sections';

import { userPrefs } from '~/cookies';

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const work = formData.get('work');

    console.log({ work });

    const errors = {
      work: work ? null : 'work is required',
    };
    const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
    if (hasErrors) {
      return json<any>(errors);
    }

    return redirect('/');
  } catch (error) {
    return json({});
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  // const cookieHeader = request.headers.get('Cookie');

  // const { pages, employees } = (await userPrefs.parse(cookieHeader)) || {};

  // const cookie = { pages, employees };

  // return json(
  //   { data: 'Hello World!!' },
  //   { headers: { 'Set-Cookie': await userPrefs.serialize(cookie) } },
  // );
  return json({
    posts: [
      {
        node: {
          slug: 'new slug',
          title: 'New title',
          author: {
            name: 'New author',
            photo: {
              url: 'https://obs.line-scdn.net/0hwtqz96J5KFtMAz9rar9XDHRVJCp_ZTJSbmxvPmwBImtpL2hdcGB7OGwBJXcyZz0PbGA1aGxQcT40NmYJIg/w644',
            },
          },
          featuredImage: { url: 'https://en.pimg.jp/066/591/114/1/66591114.jpg' },
        },
        title: 'New Title',
      },
    ],
  });
};

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

export default function Index() {
  const { posts } = useLoaderData();

  const errors = useActionData();

  const transition = useTransition();
  const isCreating = Boolean(transition.submission);

  return (
    <>
      <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
        <div className="container px-10 mx-auto mb-8">
          <FeaturedPosts />
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="col-span-1 lg:col-span-8">
              {posts.map((post: any) => (
                <PostCard post={post.node} key={post.title} />
              ))}
            </div>
            <div className="col-span-1 lg:col-span-4">
              <div className="relative lg:sticky top-8">
                <PostWidget />
                <Categories />
              </div>
            </div>
          </div>
        </div>
        <Form method="post">
          <p>
            <label>
              Work Title: {errors?.work ? <em className="text-red-600">{errors.work}</em> : null}
              <input type="text" name="work" className={inputClassName} />
            </label>
          </p>

          <p className="mt-2 text-right">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
              disabled={isCreating}
            >
              {isCreating ? 'Creating...' : 'Create Post'}
            </button>
          </p>
        </Form>
      </div>
    </>
  );
}
