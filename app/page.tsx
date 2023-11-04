'use client'

import { useEffect, useState } from "react";

import HomeLink from "./components/HomeLink";
import MissingList from "./components/MissingList";

const contentful = require('contentful')

type ContentfulImage = {
  sys: {
    id: string;
  };
  fields: {
    file: {
      url: string;
    }
  };
}

type MissingDataFields = {
  celular: number;
  colonia: string;
  fechaDeReporte: string;
  foto: Array<ContentfulImage>;
  municipio: string;
  nombres: Array<string>;
  encontrado: boolean;
}

type ContentfulMissingItem = {
  fields: MissingDataFields;
}

type ContentfulItem = {
  sys: {
    id: string;
  };
  items: Array<MissingItem>;
}

export type ImageItem = {
  id: string;
  url: string;
};

export type MissingItem = {
  id: string;
  nombres: Array<string>;
  celular: number;
  fotos: Array<ImageItem>;
  municipio: string;
  encontrado: boolean;
  fechaDeReporte: string;
};

export default function Home() {
  const [data, setData] = useState<Array<MissingItem>>([])

  useEffect(() => {
    const fn = async () => {
      const client = contentful.createClient({
        space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
        accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
        // environment: '<environment_id>', // defaults to 'master' if not set
      })

      client.getEntries()
        .then((response: ContentfulItem) => {
          const items: Array<MissingItem> = response.items.map((item: any) => {
            const missingItem: MissingItem = {
              id: item.sys.id,
              celular: item.fields.celular,
              fechaDeReporte: item.fields.fechaDeReporte,
              fotos: item.fields.foto.map((imgObj: ContentfulImage) => {
                const foto: ImageItem = {
                  id: imgObj.sys.id,
                  url: imgObj.fields.file.url,
                };
                return foto;
              }),
              municipio: item.fields.municipio,
              nombres: item.fields.nombres,
              encontrado: item.fields.encontrado,
            };

            return missingItem;
          })

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
