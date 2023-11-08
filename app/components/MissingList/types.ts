export type ContentfulImage = {
    sys: {
        id: string;
    };
    fields: {
        file: {
            url: string;
        }
    };
}

export type MissingDataFields = {
    celular: number;
    colonia: string;
    fechaDeReporte: string;
    foto: Array<ContentfulImage>;
    municipio: string;
    nombres: Array<string>;
    encontrado: boolean;
}

export type ContentfulItem = {
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
