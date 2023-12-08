import { ParentClass } from "../configurations/parent.class";
import { IInputvalidateController } from "../interfaces/i.input.controllers";
import { ValidateToken } from "../services/case/validate.token";

export class ValidateController extends ParentClass {

    public method: "get" | "post" | "put" = 'get';
    public path: string = '/v1/utilities/token/validate';
    private service: ValidateToken = new ValidateToken();

    public async use(params : IInputvalidateController ): Promise<any> {
       const response = await this.service.startProcess(params);
       return response;
    }
    
}
