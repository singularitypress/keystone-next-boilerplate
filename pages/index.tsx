// Import the generated Lists API and types from Keystone
import { query } from ".keystone/api";
import Head from "next/head";
import { Hero } from "@components/hero";

type THero = {
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
export default ({ hero }: { hero: THero }) => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Hero {...hero} />
    </>
  );
};

export const getStaticProps = async () => {
  const hero = (await query.Hero.findOne({
    where: { slug: "home" },
    query:
      "id title subTitle ctaText ctaURL bgLight { publicUrlTransformed } bgDark { publicUrlTransformed }",
  })) as THero;
  if (!hero) {
    return { notFound: true };
  }
  return { props: { hero } };
};
