
import { IInputControllerSave } from '../../interfaces/i.input.controllers';
import { Sendservice } from '../mail/send.service';
import { Collections, Domain } from '../../constants';
import { DBFirebaseService } from '../database/db.firebase.service';
import { SecureUtilitiesService } from '../utilities/secure.utilities.service';
import { IModelCurriculum } from '../../interfaces/i.model.database';
import { DateUtilities } from '../utilities/date.utilities.service';

/* La clase ResumeFollowUp se encarga de guardar los datos de entrada en una base de datos y enviar un
correo electrónico con los datos guardados. */
export class ResumeFollowUp{

    private static readonly TEMPLATE = 'create-curriculum.template.html';

    /**
     * La función `startProcess` guarda los datos de entrada en una base de datos y envía un correo
     * electrónico con los datos guardados.
     * @param {IInputControllerSave} params - El parámetro `params` es un objeto de tipo
     * `IInputControllerSave`. Contiene las siguientes propiedades:
     * @returns un objeto con dos propiedades: "respuesta" y "respuestaDatabase".
     */
    public async startProcess(params: IInputControllerSave , isValidateExist = true, code = ''){
        console.log('Params ' + JSON.stringify(params));
        let itemTemp;
        let secure: string;
        if (isValidateExist){
            itemTemp = await DBFirebaseService.searchDocument(Collections.CURRICULUM , params.correo , params.nombre );
        }
        const curriculum: any = params.curriculum;
        console.log('itemTemp' , itemTemp)
        if ((itemTemp == undefined) || (itemTemp && itemTemp.length === 0)){
            secure = SecureUtilitiesService.generate();
            let itemSaveDatabase: IModelCurriculum = {
                nombre: params.nombre,
                correo: params.correo,
                curriculum,
                use: false,
                date: DateUtilities.getNow()
            };
            await DBFirebaseService.setDocument( Collections.CURRICULUM , itemSaveDatabase , secure);
        } else {
            secure = (itemTemp || itemTemp.length > 0) ? itemTemp[0].id : code;
        }
        // START ENVIO DE CORREO
        let body = { 
            nombre: params.nombre, 
            curriculum: '' , 
            secure: `${Domain.test.domain}${secure}` 
        };
        params.curriculum.forEach ( item => {
            body.curriculum +=`<div class="table"><span>${item.text}</span><span>${item.frecuency}</span></div>`
        });
        const response = await Sendservice.run( params.correo , { subject: 'Tu Curriculum', body } , ResumeFollowUp.TEMPLATE);
        return response;
    }
}