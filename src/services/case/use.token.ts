import { Collections } from "../../constants";
import { IInputControllerSave, IInputUseController } from "../../interfaces/i.input.controllers";
import { IModelCurriculum } from "../../interfaces/i.model.database";
import { DBFirebaseService } from "../database/db.firebase.service";
import { DateUtilities } from "../utilities/date.utilities.service";
import { SecureUtilitiesService } from "../utilities/secure.utilities.service";
import { ResumeFollowUp } from "./resume.follow-up";

export class UseToken {

    private service: ResumeFollowUp = new ResumeFollowUp();

    public async startProcess(params: IInputUseController): Promise<any>{
        const info = await this.searchDatabase(params.token);
        const send: IInputControllerSave = {
            correo: info.correo, curriculum: [], nombre: info.nombre, use: true, date: info.date
        };
        info.curriculum.forEach( (curriculum: any) => {
            send.curriculum.push({ text: curriculum.text, frecuency: curriculum.frecuency });
            if (! curriculum.hasOwnProperty('report') ) { curriculum['report'] = []; }
            const item = params.curriculum.find( item => (item.text === curriculum.text && item.frecuency === curriculum.frecuency) );
            if(item) {
                curriculum.report.push( DateUtilities.getNow() );
            }
        });
        await DBFirebaseService.setDocument( Collections.CURRICULUM , send , params.token);
        const response = await this.service.startProcess(info , false , SecureUtilitiesService.generate());
        return response
    }

    private async searchDatabase(token: string): Promise<IModelCurriculum>{
        const responseDatabase: IModelCurriculum = await DBFirebaseService.getAny(Collections.CURRICULUM , token);
        return responseDatabase;
    }
}