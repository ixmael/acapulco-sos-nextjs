'use client'

import { useState, useEffect } from "react"

import Row from "./row"
import settings from '../../conf/environment';
import { useDebounce } from "@/app/hooks/useDebounce";

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

const client = contentful.createClient({
    accessToken: settings.contentful_access_token,
    space: settings.contentful_space_id,
    // environment: '<environment_id>', // defaults to 'master' if not set
})

export default function MissingList() {
    const [list, setList] = useState<Array<MissingItem>>([]);
    const [showAll, setShowAll] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchResults, setSearchResults] = useState<Array<MissingItem>>([]);
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
    };
    
    useEffect(() => {
        client.getEntries()
            .then((response: ContentfulItem) => {
                return response.items
                    .map((item: any) => {
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
            })
            .then((l: any) => setList(l))
            .catch((err: any) => {
                console.error(err)
                return []
            })
            .finally(() => {
            })
    }, [])

    useEffect(() => {
        if (debouncedSearchTerm.trim() !== "") {
            const filtered = list.filter((item) => {
                return item.nombres.some((name) => name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) || 
                    item.municipio.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
            });
            setSearchResults(filtered);
        } else {
            setSearchResults(list);
        }
    }, [debouncedSearchTerm, list]);

    const displayedList = searchTerm ? searchResults : list;

    const filteredList = !showAll
        ? displayedList.filter((item: MissingItem) => !item.encontrado)
        : displayedList;

    let dataView = (
        <div>Sin datos</div>
    )
    if (list.length > 0) {
        dataView = (
            <table className="w-full text-md text-left text-gray-500 dark:text-gray-400 border-collapse">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="border border-slate-300 px-6 py-3">
                            Reportado
                        </th>
                        <th scope="col" className="border border-slate-300 px-6 py-3">
                            Nombres
                        </th>
                        <th scope="col" className="border border-slate-300">
                            Celular
                        </th>
                        <th scope="col" className="border border-slate-300 px-6 py-3">
                            Municipio
                        </th>
                        <th scope="col" className="border border-slate-300 px-6 py-3">
                            Imágenes
                        </th>
                        <th scope="col" className="border border-slate-300 px-6 py-3">
                            Encontrado
                        </th>
                        {/*
                        <th scope="col" className="border border-slate-300 px-6 py-3">
                            &nbsp;
                        </th>
                        */}
                    </tr>
                </thead>
                <tbody>
                    {filteredList.map((missing: MissingItem) => (
                        <Row key={missing.id} missing={missing} />
                    ))}
                </tbody>
            </table>
        )
    }

    return (
        <div className="missing-list">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Listado de personas extraviadas
            </h2>
            <input
                type="text"
                className=" w-80 mb-4 p-2 border rounded"
                placeholder="Buscar por nombre, apellido o municipio"
                value={searchTerm}
                onChange={handleSearch}
            />
            <div className="flex mb-4">
                <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setShowAll(!showAll)}
                >
                    {showAll ? 'Ocultar personas encontradas' : 'Mostrar personas encontradas'}
                </button>
            </div>
            {dataView}
        </div>
    )
}
