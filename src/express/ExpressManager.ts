import { IRota } from './interfaces/IRota';
import { HttpMethod } from './HttpMethod';
import * as express from "express"
import { ApplicationRequestHandler, IRouterHandler, RequestHandlerParams } from "express-serve-static-core";
import { IKeyValue } from "../interfaces/IKeyValue";


class ExpressManager {

    private express: express.Application = express();
    private antes: RequestHandlerParams[] = new Array;
    private depois: RequestHandlerParams[] = new Array;
    private mapInstanceRotas: Map<Object, IRota[]> = new Map;
    private wasRegistrado: boolean = false;
    private pathRotas: any = null;

    public registrarMiddlewareAntesDaRota(middleware: RequestHandlerParams[] | RequestHandlerParams) : ExpressManager {
        this.antes.concat(middleware);
        return this;
    }

    public registrarMiddlewareAposRota(middleware: RequestHandlerParams[] | RequestHandlerParams) : ExpressManager {
        this.depois.concat(middleware);
        return this;
    }

    public registrarRota(rota: IRota) {
       if (this.mapInstanceRotas.has(rota.obj)) {
           this.mapInstanceRotas.get(rota.obj).push(rota);
       } else {
           this.mapInstanceRotas.set(rota.obj, [rota]);
       }
    }

    public startServer(port: number, hostname: string, callback: Function = () => {}) {
        this.express.listen(port, hostname);
    }

    public registrarRotas(pathRotas: string) : ExpressManager {
        if (this.pathRotas) {
            throw new Error("O Path das rotas já foi registrado");
        }
        this.pathRotas = pathRotas;
        return this;
    }

    private registrarMiddlewares(middlewares: RequestHandlerParams[]) : void {
        middlewares.forEach(middleware => this.express.use(middleware));
    }

    private commitRota(rota: IRota) : void{
        const express = <IKeyValue>this.express;
        let instance = new rota.obj.constructor();
        express[rota.methodHttp](rota.urn, function () {
            instance[rota.fnName](...arguments)
        });
    }

    private commitRotas() : void {
        require(this.pathRotas);
        this.mapInstanceRotas.forEach( (rotas, objRota) => rotas.forEach(rota => this.commitRota(rota) ));
    }

    public commit() : ExpressManager {
        
        if (this.wasRegistrado) {
            throw new Error("Express já registrou seus middlware e rotas");
        }
        this.registrarMiddlewares(this.antes);
        this.commitRotas();
        this.registrarMiddlewares(this.depois);
        this.wasRegistrado = true;
        return this;
    }
}

export const expressConfigs = new ExpressManager();