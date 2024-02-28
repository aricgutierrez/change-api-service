import { ParentClass } from "../configurations/parent.class";
import { UseToken } from "../services/case/use.token";

export class UseTokenController extends ParentClass {

    public method: "get" | "post" | "put" = 'put';
    public path: string = '/v1/utilities/token/use';
    private service: UseToken = new UseToken();

    public async use(body: any): Promise<any> {
        const response = await this.service.startProcess(body);
        return response;
    }

}