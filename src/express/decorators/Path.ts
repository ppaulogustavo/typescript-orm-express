import { ICaminhoRelativo } from './../interfaces/ICaminhoRelativo';
import { HttpMethod } from './../HttpMethod';
import { expressConfigs } from "../ExpressManager"

export function Path(methodHttp: HttpMethod, urn: string = "") {

    return function (obj: any, propertyKey: string, descriptor: PropertyDescriptor) { 
        expressConfigs.registrarRota({ fnName: propertyKey, obj, methodHttp, urn: getUrn(obj, urn) });
        return obj[propertyKey];
    }

    function getUrn(target: any, urn: string) : string {
        let url = "";
        try {
            const controller = <ICaminhoRelativo> target;
            url += controller.getCaminhoRelativo();
        }catch {}
        return `${url}${urn}`
    }
}