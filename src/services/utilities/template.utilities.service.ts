export class TemplateUtilitiesService {

    public static replaceParams(template: string , body : {[key: string]: boolean|number|string;} | any ): string {
        const keys: string[] = Object.keys(body);
        keys.forEach( key => {
            const replace: string = `{{${key}}}`;
            template = template.replace( replace , body[key] );
        });
        return template;
    }
}