import { IRota } from './interfaces/IRota';
import { HttpMethod } from './HttpMethod';
import * as express from "express"
import { RequestHandlerParams, Request } from "express-serve-static-core";
import { IKeyValue } from "../interfaces/IKeyValue";

export type ResquestHandler = RequestHandlerParams[] | RequestHandlerParams;

class ExpressManager {

    private express: express.Application = express();
    private antes: RequestHandlerParams[] = new Array;
    private depois: RequestHandlerParams[] = new Array;
    private mapInstanceRotas: Map<Object, IRota[]> = new Map;
    private wasCommitado: boolean = false;
    private pathRotas: any = null;

    public registrarMiddlewareAntesDaRota(middleware: ResquestHandler) : ExpressManager {
        this.antes = this.antes.concat(middleware);
        return this;
    }

    public registrarMiddlewareDepoisDaRota(middleware: ResquestHandler) : ExpressManager {
        this.depois = this.depois.concat(middleware);
        return this;
    }

    public registrarRota(rota: IRota) {
       if (this.mapInstanceRotas.has(rota.obj)) {
           this.mapInstanceRotas.get(rota.obj).push(rota);
       } else {
           this.mapInstanceRotas.set(rota.obj, [rota]);
       }
    }

    public setConfig(nome: string, valor: Object) {
        this.express.set(nome, valor);
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

    private commitMiddlewares(middlewares: RequestHandlerParams[]) : void {
        middlewares.forEach(middleware => this.express.use(middleware));
    }

    private commitRota(rota: IRota) : void{
        const express = <IKeyValue>this.express;
        let instance = new rota.obj.constructor();
        express[rota.ExpressMethod](rota.urn, function (... args) {
            instance[rota.fnName](... args)
        });
    }

    private commitRotas() : void {
        require(this.pathRotas);
        this.mapInstanceRotas.forEach( (rotas, objRota) => rotas.forEach(rota => this.commitRota(rota) ));
    }

    public commit() : ExpressManager {
        
        if (this.wasCommitado) {
            throw new Error("Express já commitou seus middlware e rotas");
        }
        this.commitMiddlewares(this.antes);
        this.commitRotas();
        this.commitMiddlewares(this.depois);
        this.wasCommitado = true;
        return this;
    }
}

export const expressConfigs = new ExpressManager();