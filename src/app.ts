// src/app.ts
import { formRoutes } from './routes/formRoute';
import {accountRoutes }from './routes/Route'
import{incomingDataRoutes} from './routes/incomingDataRoute'

import "reflect-metadata";
import { DataSource } from "typeorm";
import express, { Request, Response } from "express";
import { Form } from "./entity/Form";
// import path from 'path'
// import swaggerUi from 'swagger-ui-express-subtags';
// import YAML from 'yamljs'

const app = express();
import helmet from 'helmet';
import { Account } from './entity/Account';
import { Destination } from './entity/Destination';

app.use(express.json());
// const swaggerYamlPath = path.join(__dirname, 'swagger', 'swagger.yaml');
// const apiDocument = YAML.load(swaggerYamlPath);

// // Serve Swagger UI at a specific endpoint
// app.use('/accounts/docs', swaggerUi.serve, swaggerUi.setup(apiDocument));

 app.use(helmet());
const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: true,
  entities: [Form ,Account ,Destination],
});

AppDataSource.initialize()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => console.log(error));

  app.use('/forms', formRoutes);
  app.use('/accounts',accountRoutes );
  app.use('/server' ,incomingDataRoutes )
  
  

