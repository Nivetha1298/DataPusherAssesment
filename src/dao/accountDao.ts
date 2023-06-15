import { Connection, Repository } from 'typeorm';
import { Account } from '../entity/Account';
import { randomBytes } from 'crypto';

function generateAppSecretToken(): string {
  return randomBytes(16).toString('hex');
}

export class AccountDAO {
  private accountRepository: Repository<Account>;

  constructor(private connection: Connection) {
    this.accountRepository = this.connection.getRepository(Account);
  }

  async create(accountData: Partial<Account>): Promise<Account> {
    try {
      const appSecretToken = generateAppSecretToken();

      const account = this.accountRepository.create({
        ...accountData,
        appSecretToken: appSecretToken,
      });

      return await this.accountRepository.save(account);
    } catch (error) {
      console.log('Failed to create Account:', error);
      throw new Error('Failed to create Account');
    }
  }

  async get(accountId: number): Promise<Account | undefined> {
    try {
      const account = await this.accountRepository.findOne({ where: { account_id: accountId } });
      return account;
    } catch (error) {
      console.log('Failed to get Account:', error);
      throw new Error('Failed to get Account');
    }
  }

  async getAll(): Promise<Account[]> {
    try {
      const accounts = await this.accountRepository.find();
      return accounts;
    } catch (error) {
      console.log('Failed to get all accounts:', error);
      throw new Error('Failed to get all accounts');
    }
  }

  async edit(accountId: number, accountData: Partial<Account>): Promise<Account> {
    try {
      const account = await this.accountRepository.findOne({ where: { account_id: accountId } });
      if (!account) {
        throw new Error('Account not found');
      }
  
      // Update the properties of the account object
      if (accountData.email) {
        account.email = accountData.email;
      }
      if (accountData.accountName) {
        account.accountName = accountData.accountName;
      }
      if (accountData.website) {
        account.website = accountData.website;
      }
  
      return await this.accountRepository.save(account);
    } catch (error) {
      console.log('Failed to edit Account:', error);
      throw new Error('Failed to edit Account');
    }
  }

  async delete(accountId: number): Promise<void> {
    try {
      const account = await this.accountRepository.findOne({where: { account_id: accountId }});
      if (!account) {
        throw new Error('Account not found');
      }

      await this.accountRepository.remove(account);
    } catch (error) {
      console.log('Failed to delete Account:', error);
      throw new Error('Failed to delete Account');
    }
  }

  async getAccountBySecretToken(appSecretToken: string): Promise<Account | undefined> {
    try {
      return await this.accountRepository.findOne({where:{appSecretToken:appSecretToken} });
    } catch (error) {
      console.log('Failed to get account by secret token:', error);
      throw new Error('Failed to get account by secret token');
    }
  }
}
  
  

