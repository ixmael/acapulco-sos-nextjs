'use client';


import HomeLink from "./components/HomeLink";
// import { LoadingAnimation } from "./components/LoadinAnimation";
import MissingList from "./components/MissingList";
import { useLoading } from "./context/LoaderContext";

export default function Home() {
  const { loading } = useLoading();

  return (
    <main className="md:container md:mx-auto">
      <HomeLink />
      {loading && (<div>cargando los registros</div>)}
      <MissingList />
    </main>
  )
}
