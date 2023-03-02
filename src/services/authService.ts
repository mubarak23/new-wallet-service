import { ISignupDto } from "../dto/IAgentSignupDto"
import * as Utils from '../utils/core'
import { User } from "../entity/User"
import { Roles } from "../enums/Roles"
import { getFreshConnection } from "../db"
import * as TokenService from "../services/tokenService";
import * as WalletService from "../services/walletService"

export const authSignup = async (reqBody: ISignupDto): Promise <any>  =>{
  const connection = await getFreshConnection()

  const newSignupSuccess = await connection.transaction(async (transactionalEntityManager) => {
    const userRepo = transactionalEntityManager.getRepository(User)
    const passwordHash = await Utils.generatePasswordHash(reqBody.password)
    const newUser = new User().initialize(
        reqBody.firstName, reqBody.lastName, reqBody.emailAddress, 
        reqBody.phoneNumber, passwordHash, Roles.NORMAL_USER
    )
    const saveUser = await userRepo.save(newUser)
  
    const signUpToken = await TokenService.getAccessToken(saveUser)
    const wallet = await WalletService.createWallet(saveUser.id)
    
    return { saveUser, signUpToken, wallet }
  })
      
  return newSignupSuccess
}