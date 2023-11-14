'use client';

import { useState, useEffect } from "react";

import settings from '@/app/conf/environment';

import HomeLink from "@/app/components/HomeLink";
import PositionIcon from '@/app/components/Icons/Position'

const contentful = require('contentful')

const client = contentful.createClient({
    accessToken: settings.contentful_access_token,
    space: settings.contentful_space_id,
    // environment: '<environment_id>', // defaults to 'master' if not set
})

export default function PersonaExtraviada({ params }: { params: { slug: string } }) {
    const {
        slug,
    } = params

    const [data, setData] = useState<any>(null)

    useEffect(() => {
        client.getEntry(slug)
            .then((entry: any) => {
                console.log(entry)
                setData(entry.fields)
            })
            .catch((err: any) => {
                console.error('err', err)
            })
            .finally(() => {
                console.log('finally')
            })
    }, [slug])

    let dataView = (<div>loading</div>)
    if (data) {
        const reportedAt = new Date(data.fechaDeReporte)

        dataView = (
            <div
                className={`${data.encontrado ? 'found' : 'not-found'}`}
            >
                <header>
                    <ul
                        className="names"
                    >
                        {data.nombres.map((nombre: string) => (
                            <li
                                key={nombre}
                                className="text-lg font-bold tracking-tight text-gray-900 sm:text-2xl"
                            >
                                {nombre}
                            </li>
                        ))}
                    </ul>
                </header>
                <div
                    className="position flex w-full"
                >
                    <div>
                        <PositionIcon />
                    </div>
                    <div>
                        Colonia: {data.colonia}
                    </div>
                    <div>
                        Municipio: {data.municipio}
                    </div>
                </div>
                <div
                    className="telefono"
                >
                    Teléfono: {data.celular}
                </div>
                <div
                    className="fecha"
                >
                Fecha de reporte: {reportedAt.getDay()} / {reportedAt.getMonth()} / {reportedAt.getFullYear()}
                </div>
                <div
                    className={`estado ${data.encontrado ? '' : 'not-found'}`}
                >
                    ¿Encontradxs? {data.encontrado ? 'sí' : 'no'}
                </div>
                <div>
                    {data.notas}
                </div>
                <ul>
                    {data.foto.map((imgObj: any) => {
                        return (
                            <li key={imgObj.sys.id}>
                                <img
                                    src={`https:${imgObj.fields.file.url}`}
                                    width={300}
                                    height={300}
                                    alt={data.nombres.join(', ')}
                                />
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

    return (
        <main
            id="persona-extraviada"
            className="md:container md:mx-auto"
        >
            <HomeLink />
            {dataView}
        </main>
    )
}
