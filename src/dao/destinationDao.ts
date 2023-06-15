import { Connection, Repository } from 'typeorm';
import { Destination } from '../entity/Destination';
import { Account } from '../entity/Account';

export class DestinationDAO {
  private destinationRepository: Repository<Destination>;
  private accountRepository: Repository<Account>;

  constructor(private connection: Connection) {
    this.destinationRepository = this.connection.getRepository(Destination);
    this.accountRepository = this.connection.getRepository(Account);
  }

  async create(accountId: number, destinationData: Partial<Destination>): Promise<Destination> {
    try {
      const account = await this.accountRepository.findOne({where: { account_id: accountId }});
      if (!account) {
        throw new Error('Account not found');
      }

      const destination = new Destination();
      destination.account = account;
      Object.assign(destination, destinationData);

      return await this.destinationRepository.save(destination);
    } catch (error) {
      console.log('Failed to create destination:', error);
      throw new Error('Failed to create destination');
    }
  }

  async getDestinationsByAccount(accountId: number): Promise<Destination[]> {
    try {
      const destinations = await this.destinationRepository
        .createQueryBuilder('d')
        .innerJoinAndSelect('d.account', 'a')
        .where('a.account_id = :accountId', { accountId })
        .getMany();
  
      return destinations;
    } catch (error) {
      console.log('Failed to get destinations:', error);
      throw new Error('Failed to get destinations');
    }
  }


  async edit(destinationId: number, destinationData: Partial<Destination>): Promise<Destination> {
    try {
      const destination = await this.destinationRepository.findOne({where: {destination_id :destinationId }});
      if (!destination) {
        throw new Error('Destination not found');
      }
  
      Object.assign(destination, destinationData);
  
      return await this.destinationRepository.save(destination);
    } catch (error) {
      console.log('Failed to edit destination:', error);
      throw new Error('Failed to edit destination');
    }
  }
  
  async delete(destinationId: number): Promise<void> {
    try {
      const destination = await this.destinationRepository.findOne({where: {destination_id :destinationId }});
      if (!destination) {
        throw new Error('Destination not found');
      }
  
      await this.destinationRepository.remove(destination);
    } catch (error) {
      console.log('Failed to delete destination:', error);
      throw new Error('Failed to delete destination');
    }
  }
  
  
  
}
