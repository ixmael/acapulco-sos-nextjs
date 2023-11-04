'use client'

import { useEffect, useState } from "react";

import HomeLink from "./components/HomeLink";
import MissingList from "./components/MissingList";

const contentful = require('contentful')

export default function Home() {
  const [data, setData] = useState<Array<any>>([])

  useEffect(() => {
    const fn = async () => {
      const client = contentful.createClient({
        space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
        accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
        // environment: '<environment_id>', // defaults to 'master' if not set
      })

      client.getEntries()
        .then((response: any) => {
          const items: Array<any> = response.items.map((item: any) => ({
            id: item.sys.id,
            celular: item.fields.celular,
            colonia: item.fields.colonia,
            fechaDeReporte: item.fields.fechaDeReporte,
            foto: item.fields.foto,
            municipio: item.fields.municipio,
            nombres: item.fields.nombres,
            encontrado: item.fields.encontrado,
          }))

          setData(items)
        })
        .catch((err: any) => {
          console.error(err)
        })
        .finally(() => {
          console.log('finally')
        })
    }

    fn()
  }, [])

  return (
    <main className="md:container md:mx-auto">
      <HomeLink />
      <MissingList list={data} />
    </main>
  )
}
