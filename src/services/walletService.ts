import { Wallet } from "../entity/Wallet"
import  { getFreshConnection} from '../db'
import { WalletType } from "../enums/WalletType"
import * as _ from "underscore";

import { User } from "../entity/User";

import { CountryToCurrency } from "../enums/Currency";


export const getCustomerWallet = async (userId: number): Promise<Wallet> => {
  const connection = await getFreshConnection();
  const walletRepo = connection.getRepository(Wallet);

  let sourceWallet = await walletRepo.findOne({
    userId,
    type: WalletType.PLATFORM,
  });

  if (!sourceWallet) {
    const userRepo = connection.getRepository(User);
    const user = await userRepo.findOne({ id: userId });
  
    const accountWallet = new Wallet().initialize(
      userId,
      0.00,
      WalletType.USER,
      CountryToCurrency.NIGERIA,
    );
    sourceWallet = await walletRepo.save(accountWallet);
  }

  return sourceWallet;
};



export const createWallet = async (userId: number) => {

  const connection = await getFreshConnection()
  const walletRepo = connection.getRepository(Wallet)
  const newWallet = new Wallet().initialize(
    userId, 0.00, WalletType.USER, CountryToCurrency.NIGERIA
)
const saveWallet = await walletRepo.save(newWallet)
return saveWallet

}

export const userWallet = async (userId: number) => {
  const connection = await getFreshConnection()
  const walletRepo = connection.getRepository(Wallet)
  const wallet = walletRepo.findOne({
    userId
  })
  return wallet
}