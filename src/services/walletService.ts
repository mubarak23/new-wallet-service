import { Wallet } from "../entity/Wallet"
import  { getFreshConnection} from '../db'
import { WalletType } from "../enums/WalletType"
export const createWallet = async (userId: number) => {

  const connection = await getFreshConnection()
  const walletRepo = connection.getRepository(Wallet)
  const newWallet = new Wallet().initialize(
    userId, 0.00, WalletType.USER, 'NGN'
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