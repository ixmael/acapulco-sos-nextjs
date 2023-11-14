'use client'

import Row from "../row";
import { MissingItem } from "../types";

type MissingTableProps = {
    list: Array<MissingItem>;
    showFound: boolean;
};

export const MissingTable: React.FC<MissingTableProps> = ({ list, showFound }) => {
    const filteredList = !showFound
        ? list.filter((item: MissingItem) => !item.encontrado)
        : list;

    return (
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
                    <th scope="col" className="border border-slate-300 px-6 py-3">
                        &nbsp;
                    </th>
                </tr>
            </thead>
            <tbody>
                {filteredList.map((missing: MissingItem) => (
                    <Row key={missing.id} missing={missing} />
                ))}
            </tbody>
        </table>
    );
};
