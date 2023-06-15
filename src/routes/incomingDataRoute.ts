import express from 'express';
import { Connection, createConnection } from 'typeorm';
import { IncomingDataController } from '../controller/IncomingDataController';

const router = express.Router();

createConnection().then((connection: Connection) => {
    const incomingDataController = new IncomingDataController(connection);
    router.post('/incoming_data', incomingDataController.handleIncomingData);
})


export const incomingDataRoutes = router;