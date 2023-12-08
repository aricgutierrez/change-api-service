export interface IModelDetailCurriculum {
    text: string;
    frecuency: '1S' | '3S' | '1M' | '4M' | '1DS' | '1DM';
}

export interface IModelDetailCurriculumExtends extends IModelDetailCurriculum {
    report: [];
}

export interface IModelCurriculum {
    nombre: string;
    correo: string;
    curriculum: IModelDetailCurriculum[] | IModelDetailCurriculumExtends[];
    use: boolean;
    date: string;
}
