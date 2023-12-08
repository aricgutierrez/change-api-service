export interface ICurriculum {
    text: string ;
    frecuency: string ;
}

export interface IInputControllerSave{
    nombre: string;
    correo: string;
    curriculum: ICurriculum[];
    use?: boolean;
    date?: string;
}

export interface IInputvalidateController{
    token: string;
}

export interface IInputUseController {
    token: string;
    curriculum: ICurriculum[];
}