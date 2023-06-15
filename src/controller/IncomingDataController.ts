import { Request, Response } from 'express';
import { Connection, createConnection } from 'typeorm';
import { AccountDAO } from '../dao/accountDao'
import { DestinationDAO } from '../dao/destinationDao';

export class IncomingDataController {
  private accountDao: AccountDAO;
  private destinationDao: DestinationDAO;

  constructor(private connection:Connection) {
    this.accountDao = new AccountDAO(connection);
    this.destinationDao = new DestinationDAO(connection);
  }
   
  

  async handleIncomingData(req: Request, res: Response): Promise<void> {
    const { method, body } = req;
    const { appSecretToken } = body;
console.log(appSecretToken , "rrrrr");
    if (method === 'GET' && !req.is('application/json')) {
      res.status(400).json({ error: 'Invalid Data' });
      return;
    }

    if (!appSecretToken) {
      res.status(401).json({ error: 'Unauthenticated' });
      return;
    }

    try {
      const account = await this.accountDao.getAccountBySecretToken(appSecretToken);
        console.log(account  , "jjjjjj");
      if (!account) {
        res.status(401).json({ error: 'Unauthenticated' });
        return;
      }

      // Process the data and send it to destinations

      res.status(200).json({ message: 'Data received and processed successfully' });
    } catch (error) {
      console.log('Error handling incoming data:', error);
      res.status(500).json({ error: 'Failed to handle incoming data' });
    }
  }
}
