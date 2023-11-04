'use client'

import { gql } from "@apollo/client";
import createApolloClient from "../api";
import { useEffect, useState } from "react";
// import * as contentful from 'contentful-management'
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
            title: item.fields.titulo,
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

  let dataView = (<div>no hay datos</div>)
  if (data.length > 0) {
    dataView = (
      <ul>
        {data.map((item: any) => (<li key={item.id}>{item.title}</li>))}
      </ul>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Acapulco SOS</h1>
      {dataView}
    </main>
  )
}
