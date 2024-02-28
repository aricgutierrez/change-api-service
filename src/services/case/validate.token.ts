import { Collections } from "../../constants";
import { IInputvalidateController } from "../../interfaces/i.input.controllers";
import { IModelCurriculum } from "../../interfaces/i.model.database";
import { DBFirebaseService } from "../database/db.firebase.service";
import { SecureUtilitiesService } from "../utilities/secure.utilities.service";

export class ValidateToken {

    /**
     * La función `startProcess` valida un token utilizando un servicio de utilidades seguro, busca en una
     * base de datos utilizando el token y devuelve los planes de estudio encontrados.
     * @param {IInputvalidateController} params - IInputvalidateController
     * @returns La función `startProcess` devuelve la propiedad `curriculums` del objeto `info`.
     */
    public async startProcess(params: IInputvalidateController): Promise<any> {
        if ( SecureUtilitiesService.validate(params.token)) {
            const info = await this.searchDatabase(params.token);
            return info.curriculum;
        }
        throw new Error("Token invalid");
    }

    /**
     * La función busca en una base de datos un token específico y devuelve el modelo de plan de
     * estudios asociado si existe y aún no se utiliza.
     * @param {string} token - El parámetro "token" es una cadena que representa un identificador único
     * para una información específica en la base de datos. Se utiliza para buscar y recuperar los
     * datos correspondientes de la base de datos.
     * @returns una Promesa que se resuelve en un objeto de tipo IModelCurriculum.
     */
    private async searchDatabase(token: string): Promise<IModelCurriculum>{
        const responseDatabase: IModelCurriculum = await DBFirebaseService.getAny(Collections.CURRICULUM , token);
        if (!responseDatabase) {
            throw new Error("There is no information associated with the token");
        }
        if (responseDatabase.use) {
            throw new Error("The token is used");
        }
        return responseDatabase;
    }
}