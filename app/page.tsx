'use client'

import { gql } from "@apollo/client";
import createApolloClient from "../api";
import { useEffect, useState } from "react";
// import * as contentful from 'contentful-management'
const contentful = require('contentful')

export default function Home() {
  const [data, setData] = useState()

  useEffect(() => {
    const fn = async () => {
      const client = contentful.createClient({
        space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
        accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
        // environment: '<environment_id>', // defaults to 'master' if not set
      })

      client.getEntries()
        .then((response: any) => console.log(response.items))
        .catch(console.error)
    }

    fn()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      test
    </main>
  )
}
