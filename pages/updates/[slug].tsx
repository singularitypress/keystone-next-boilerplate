import { GetStaticPathsResult, GetStaticPropsContext } from "next";
import Link from "next/link";

import { query } from ".keystone/api";

type Post = {
  id: string;
  title: string;
  content: string;
};

export default ({ post }: { post: Post }) => {
  return (
    <div>
      <main style={{ margin: "3rem" }}>
        <div>
          <Link href="/">
            <a>&larr; back home</a>
          </Link>
        </div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </main>
    </div>
  );
};

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const posts = (await query.Post.findMany({
    query: `slug`,
  })) as { slug: string }[];

  const paths = posts
    .filter(({ slug }) => !!slug)
    .map(({ slug }) => `/updates/${slug}`);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const post = (await query.Post.findOne({
    where: { slug: params!.slug as string },
    query: "id title content",
  })) as Post | null;
  if (!post) {
    return { notFound: true };
  }
  return { props: { post } };
};
