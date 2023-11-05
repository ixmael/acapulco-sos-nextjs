import HomeLink from "./components/HomeLink";
import MissingList from "./components/MissingList";

export default function Home() {
  return (
    <main className="md:container md:mx-auto">
      <HomeLink />
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
