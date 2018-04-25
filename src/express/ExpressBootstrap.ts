import {expressConfigs} from "./ExpressManager"
import * as bodyParser from "body-parser"
import * as validator from "express-validator"
import { createConnection } from "typeorm";


class ExpressBoostrap {

    public boostrap() {
        createConnection().then(async connection => {

            expressConfigs
                        .registrarRotas("../controller/index")
                        .registrarMiddlewareAntesDaRota(validator())
                        .registrarMiddlewareAntesDaRota(bodyParser.json())
                        .commit()
                        .startServer(3000, "localhost");
        });

    }
}

new ExpressBoostrap().boostrap();