import { HttpMethod } from './../HttpMethod';

export interface IRota {
    fnName: string;
    obj: any;
    ExpressMethod: HttpMethod;
    urn: string;
}