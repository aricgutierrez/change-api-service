import { v5 as uuidv5 } from 'uuid';
import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { Domain, Utils } from '../../constants';
import { DateUtilities } from './date.utilities.service';

export class SecureUtilitiesService{

    public static generate(): string {
        const name = Domain.secure + DateUtilities.getNow();
        return uuidv5(name , Utils.MY_NAMESPACE);
    }

    public static validate(token: string): boolean {
        return uuidValidate(token) && uuidVersion(token) === 5;
    }

}