import type { LoaderFunction, ActionFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node'; // or "@remix-run/cloudflare"
import { Form, useActionData, useLoaderData, useTransition } from '@remix-run/react';

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
  const cookieHeader = request.headers.get('Cookie');

  const { pages, employees } = (await userPrefs.parse(cookieHeader)) || {};

  const cookie = { pages, employees };

  return json(
    { data: 'Hello World!!' },
    { headers: { 'Set-Cookie': await userPrefs.serialize(cookie) } },
  );
};

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

export default function Index() {
  const { data } = useLoaderData();

  const errors = useActionData();

  const transition = useTransition();
  const isCreating = Boolean(transition.submission);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1 className="text-3xl font-bold underline mb-2">{data}</h1>
      <Form method="post">
        <p>
          <label>
            Work Title: {errors?.work ? <em className="text-red-600">{errors.work}</em> : null}
            <input type="text" name="work" className={inputClassName} />
          </label>
        </p>

        <p className="text-right mt-2">
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
  );
}
