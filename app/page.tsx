'use client';

import HomeLink from "./components/HomeLink";
import MissingList from "./components/MissingList";
import { LoadingAnimation } from "./components/LoadinAnimation";
import { useLoading } from "./context/LoaderContext";

export default function Home() {
  const { loading } = useLoading();
  return (
    <main className="md:container md:mx-auto">
      <HomeLink />
      {loading && <LoadingAnimation />}
      <MissingList />
    </main>
  )
}

/*
export const getStaticProps = async () => {
  const res = await fetch('https://.../posts')
  const posts = await res.json()
 
  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}
*/
