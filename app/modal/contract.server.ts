import contract from '~/contract';
import type { Post, PostInfo } from './post.dao';
import config from '~/config.json';

export const getPost = async (tokenId: number): Promise<Post | null> => {
  const temp = await contract.getPost(tokenId);

  if (!temp) return null;

  return {
    slug: tokenId.toString(),
    title: temp.title,
    author: temp.author,
    coverURL: temp.coverURL,
    content: temp.content,
    tags: temp.tags,
    createdAt: temp.createdAt,
  };
};

export const getPostInfo = async (tokenId: number): Promise<PostInfo | null> => {
  const temp = await contract.getPostInfo(tokenId);

  if (!temp) return null;

  return {
    slug: tokenId.toString(),
    title: temp.title,
    author: temp.author,
    coverURL: temp.coverURL,
    tags: temp.tags,
    createdAt: temp.createdAt,
  };
};

export const getTagPosts = async (tag: string): Promise<Post[]> => {
  const temp = await contract.getTag(tag);
  // 整理array 並倒轉
  const temp2 = temp.map((item: any) => item.toNumber()).reverse();

  let posts: Post[] = [];
  for (let i = 0; i < temp2.length; i++) {
    const post = await getPost(temp2[i]);

    if (!post) break;

    posts.push(post);
  }
  return posts;
};

export const getCounter = async (): Promise<number> => {
  return (await contract.tokenIdCounter()) - 1;
};

export const getAuthorPosts = async (address: string): Promise<Post[]> => {
  const temp = await contract.getAuthorPosts(address);
  // 整理array 並倒轉
  const temp2 = temp.map((item: any) => item.toNumber()).reverse();

  let posts: Post[] = [];
  for (let i = 0; i < temp2.length; i++) {
    const post = await getPost(temp2[i]);

    if (!post) break;

    posts.push(post);
  }
  return posts;
};

export const getPostByPage = async (counter: number, pageNumber: number): Promise<PostInfo[]> => {
  let posts: PostInfo[] = [];

  const start = counter - pageNumber * config.pageSize;
  const end = start - config.pageSize;

  for (let i = start; i > end; i--) {
    if (i < 0) {
      break;
    }
    const post = await getPostInfo(i);

    if (!post) {
      break;
    }
    posts.push(post);
  }

  return posts;
};
