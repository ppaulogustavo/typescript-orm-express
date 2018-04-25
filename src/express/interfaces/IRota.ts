import { HttpMethod } from './../HttpMethod';

export interface IRota {
    fnName: string;
    obj: any;
    methodHttp: HttpMethod;
    urn: string;
}