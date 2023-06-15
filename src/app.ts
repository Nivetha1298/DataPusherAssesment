// src/app.ts
import { formRoutes } from './routes/formRoutes';

import "reflect-metadata";
import { DataSource } from "typeorm";
import express, { Request, Response } from "express";
import { Form } from "./entity/Form";

const app = express();
const helmet = require('helmet');
app.use(helmet());
app.use(express.json());

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: true,
  entities: [Form],
});

AppDataSource.initialize()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => console.log(error));

  app.use('/forms', formRoutes);


