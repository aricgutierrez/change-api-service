export abstract class ParentClass {

    public abstract readonly method: 'get' | 'post' | 'put';
    public abstract readonly path: string;

    abstract use( body?: any): Promise<any>;
}