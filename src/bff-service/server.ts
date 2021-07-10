import express, { json } from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import router from "./routes";
import mongoose from "mongoose";

export default class Server {
  constructor() {
    dotenv.config();

    this._initRoutes();
    this._initMongo();
  }

  _initRoutes() {
    const app = express();
    app.use(helmet());
    app.use(json());
    const port = 3333;
    app.use("/", router);
    app.listen(port);
  }
  _initMongo() {
    console.log(process.env.DB_CONNECTION);
    return new Promise((resolve, reject) => {
      mongoose.Promise = Promise;

      mongoose.set("useNewUrlParser", true);
      mongoose.set("useFindAndModify", false);
      mongoose.set("useCreateIndex", true);

      let urlMongo = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}/${process.env.DB_DATABASE}`;

      if (process.env.DB_HOST_FULL) {
        urlMongo = `${process.env.DB_HOST_FULL}`;
      }

      mongoose.connect(urlMongo);

      mongoose.connection.on("connected", () => {
        resolve("Mongoose default connection is open to " + urlMongo);
      });

      mongoose.connection.on("error", (error) => {
        reject("Mongoose default connection has occured " + error + " error");
      });
    });
  }
}
