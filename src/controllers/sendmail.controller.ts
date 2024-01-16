import { ParentClass } from "../configurations/parent.class";
import { IInputControllerSave } from "../interfaces/i.input.controllers";
import { ResumeFollowUp } from "../services/case/resume.follow-up";

export class SendController extends ParentClass{

    public method: 'get' | 'post' | 'put' = "post";
    public path = "/v1/utilities/send/mail";
    private service: ResumeFollowUp = new ResumeFollowUp();

    public async use(params: IInputControllerSave): Promise<any> {
        const response = await this.service.startProcess(params);
        return response;
    }

}