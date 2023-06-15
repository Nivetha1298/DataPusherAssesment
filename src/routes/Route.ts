import { Request, Response, Router } from 'express';
import { accountSchema } from '../validation/accountValidation';
import {destinationSchema} from '../validation/destinationValidation'
import { AccountDAO } from '../dao/accountDao';
import { DestinationDAO } from '../dao/destinationDao';
import { createConnection, Connection } from 'typeorm';
const router = Router();

// Create an instance of AccountDAO using the Connection object
createConnection().then((connection: Connection) => {
  const accountDAO = new AccountDAO(connection);
  const destinationDAO = new DestinationDAO(connection);

  // POST /accounts
  router.post("/", async (req: Request, res: Response) => {
    try {
      const { error, value } = accountSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
    
      const account = await accountDAO.create(value);
    
      res.status(201).json({ message: 'Account created successfully', account });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating account' });
    }
  });


// Get an account by Id
router.get('/:id', async (req: Request, res: Response) => {
    try {
      const accountId = parseInt(req.params.id);
      const account = await accountDAO.get(accountId)
      res.json(account);
    } catch (error) {
      console.log('Error getting account:', error);
      res.status(500).json({ error: 'Failed to get account' });
    }
  });


  // Get all accounts
router.get('/', async (req: Request, res: Response) => {
    try {
      const accounts = await accountDAO.getAll();
      res.json(accounts);
    } catch (error) {
      console.log('Error getting all accounts:', error);
      res.status(500).json({ error: 'Failed to get all accounts' });
    }
  });

  // Edit an account
router.put('/:id', async (req: Request, res: Response) => {
    try {
      const accountId = parseInt(req.params.id);
      const accountData = req.body;
      const account = await accountDAO.edit(accountId, accountData);
      res.json(account);
    } catch (error) {
      console.log('Error editing account:', error);
      res.status(500).json({ error: 'Failed to edit account' });
    }
  });


// Delete an account
router.delete('/:id', async (req: Request, res: Response) => {
    try {
      const accountId = parseInt(req.params.id);
      await accountDAO.delete(accountId);
      res.json({ message: 'Destination deleted successfully' })
    } catch (error) {
      console.log('Error deleting account:', error);
      res.status(500).json({ error: 'Failed to delete account' });
    }
  });

// DESTINATIONS

  router.post('/:id/destinations', async (req: Request, res: Response) => {
    try {
      const destinationData = req.body;

      const { error, value } = destinationSchema.validate(destinationData);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const accountId = parseInt(req.params.id);
     console.log(accountId  , "(((((((((((((");
      const destination = await destinationDAO.create(accountId , value);
      res.status(201).json(destination);
    } catch (error) {
      console.log('Failed to create Destination:', error);
      res.status(500).json({ error: 'Failed to create Destination' });
    }
  });

  router.get('/:id/destinations', async (req: Request, res: Response) => {
    try {
      const accountId = parseInt(req.params.id);
      const destinations = await destinationDAO.getDestinationsByAccount(accountId);
      res.json(destinations);
    } catch (error) {
      console.log('Failed to fetch destinations:', error);
      res.status(500).json({ error: 'Failed to fetch destinations' });
    }
  });

  // Edit Destination
router.put('/destinations/:id', async (req, res) => {
  const destinationId = parseInt(req.params.id);
  const destinationData = req.body;

  try {
    const updatedDestination = await destinationDAO.edit(destinationId, destinationData);
    res.json(updatedDestination);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Destination
router.delete('/destinations/:id', async (req, res) => {
  const destinationId = parseInt(req.params.id);

  try {
    await destinationDAO.delete(destinationId);
    res.json({ message: 'Destination deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
  
})
export const accountRoutes = router;


