import type { MissingItem, ImageItem } from './types'

export type Missing = {
    contentful_id: string;
    celular: number;
    fechaDeReporte: string;
    foto: Array<string>;
    encontrado: boolean;
    nombres: Array<string>;
    municipio: string;
    notes: string;
}

type RowMissing = {
    missing: MissingItem,
}

const Row = (props: RowMissing) => {
    const {
        missing,
    } = props

    let foundView = (<div>no</div>)
    if (missing.encontrado) {
        foundView = (<div>sí</div>)
    }

    let imagesViews = (null)
    if (missing.fotos.length > 0) {
        imagesViews = (
            <div>
                <ul>
                    {missing.fotos.map((imgObj: ImageItem) => (
                        <li key={imgObj.id}>
                            <img
                                src={`https:${imgObj.url}`}
                                width={300}
                                height={300}
                                alt={missing.nombres.join(', ')}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    let namesView = (<div>sin nombres</div>)
    if (missing.nombres.length > 0) {
        namesView = (
            <div>
                {missing.nombres.map((nombre: string) => (<div key={nombre}>{nombre}</div>))}
            </div>
        )
    }

    const reportedAt = new Date(missing.fechaDeReporte)

    const listClasses: Array<string> = [
    ]
    if (missing.encontrado) {
        listClasses.push('found')
    }

    return (
        <tr className={listClasses.join(' ')}>
            <td className="reported-at border border-slate-300">
                {reportedAt.getDay()}/{reportedAt.getMonth()}/{reportedAt.getFullYear()}
            </td>
            <td className="names border border-slate-300">
                {namesView}
            </td>
            <td className="mobile border border-slate-300">
                {missing.celular}
            </td>
            <td className="munipipality border border-slate-300">
                {missing.municipio}
            </td>
            <td className="images border border-slate-300">
                {imagesViews}
            </td>
            <td className="found border border-slate-300">
                {foundView}
            </td>
            {/*
            <td className="details border border-slate-300">
                <a href={`/persona-desaparecida/${missing.id}`}>
                    Ver detalle
                </a>
            </td>
            */}
        </tr>
    )
}

export default Row