import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Link from "next/link";

// Import the generated Lists API and types from Keystone
import { query } from ".keystone/api";
import Head from "next/head";

type Hero = {
  id: string;
  title: string;
  subTitle?: string;
  ctaText?: string;
  ctaURL?: string;
  bgLight?: {
    publicUrlTransformed: string;
  };
  bgDark?: {
    publicUrlTransformed: string;
  };
  slug: string;
};

// Home receives a `posts` prop from `getStaticProps` below
export default ({ hero }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <main>
          <pre>
            <code>{JSON.stringify(hero)}</code>
          </pre>
        </main>
      </div>
    </>
  );
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const hero = (await query.Hero.findOne({
    where: { slug: "york-logic" },
    query:
      "id title subTitle ctaText ctaURL bgLight { publicUrlTransformed } bgDark { publicUrlTransformed }",
  })) as Hero;
  if (!hero) {
    return { notFound: true };
  }
  return { props: { hero } };
};
