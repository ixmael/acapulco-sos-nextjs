'use client'

import React, { useState, useEffect } from "react";
import { MissingItem, ContentfulItem, ContentfulImage } from "./types";
import { MissingTable } from "./MissingTable"; 
import settings from '../../conf/environment';
import { useDebounce } from "@/app/hooks/useDebounce";
import { useLoading } from "@/app/context/LoaderContext";

const contentful = require('contentful')

const client = contentful.createClient({
    accessToken: settings.contentful_access_token,
    space: settings.contentful_space_id,
    // environment: '<environment_id>', // defaults to 'master' if not set
})

export default function MissingList() {
    const { setLoading } = useLoading();
    const [list, setList] = useState<Array<MissingItem>>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [showFound, setShowFound] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchResults, setSearchResults] = useState<Array<MissingItem>>([]);
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
    };
    
    useEffect(() => {
        setLoading(true);
        client.getEntries()
            .then((response: ContentfulItem) => {
                const items = response.items.map((item: any) => {
                    const missingItem: MissingItem = {
                        id: item.sys.id,
                        celular: item.fields.celular,
                        fechaDeReporte: item.fields.fechaDeReporte,
                        fotos: item.fields.foto.map((imgObj: ContentfulImage) => {
                            return {
                                id: imgObj.sys.id,
                                url: imgObj.fields.file.url,
                            };
                        }),
                        municipio: item.fields.municipio,
                        nombres: item.fields.nombres,
                        encontrado: item.fields.encontrado,
                    };
                    return missingItem;
                });
                setList(items);
                setIsLoaded(true);
            })
            .catch((err: any) => {
                console.error(err);
                setIsLoaded(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [setLoading])

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

    const foundList = list.filter((item) => item.encontrado);
    const missingList = list.filter((item) => !item.encontrado);

    const displayedList = searchTerm ? searchResults : showFound ? foundList : missingList;

    if (isLoaded) {
        return (
            <div className="missing-list">
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Listado de personas extraviadas
                </h2>
                <input
                    type="text"
                    className="w-80 mb-4 p-2 border rounded"
                    placeholder="Buscar por nombre, apellido o municipio"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <div className="flex mb-4">
                    <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setShowFound(!showFound)}
                    >
                        { showFound ? 'Ocultar personas encontradas' : 'Mostrar personas encontradas'}
                    </button>
                </div>
                <MissingTable list={displayedList} showFound={showFound} />
            </div>
    )
    }
}
