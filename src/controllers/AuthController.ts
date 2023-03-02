import * as _ from "underscore";
import bcrypt from "bcrypt";
import { User } from "../entity/User"
import { getFreshConnection } from "../db"
import { Roles } from '../enums/Roles'
import { IServerResponse } from "../interfaces/IServerResponse";
import { Route,  Body, Post, Tags } from "tsoa";
import * as TokenService from "../services/tokenService";
import * as WalletService from "../services/walletService"
import * as AuthService from "../services/authService";
import { ISignupDto } from "../dto/IAgentSignupDto";
import { IAccessTokenData } from "../interfaces/IAccessTokenData";
import { BadRequestError, UnauthorizedRequestError } from "../utils/error-response-types";
import { ILoginDto } from "../dto/ILoginDto";


@Route("/api/auth")
@Tags("Auth Service")
export class AuthController {

@Post("/users/signup")
public async agentSignup(@Body() reqBody: ISignupDto) : Promise<IServerResponse<IAccessTokenData>>{
    const connection = await getFreshConnection()
    const userRepo = connection.getRepository(User)
    const exitingUser = await userRepo.findOne({ emailAddress: reqBody.emailAddress, phoneNumber: reqBody.phoneNumber })

    if(exitingUser){
    throw new BadRequestError("The Email Address and Phone Number has been used")
    }
    const { saveUser, signUpToken, wallet } = await AuthService.authSignup(reqBody)
    const resData : IServerResponse<any> = {
        status: true,
        data: { token: signUpToken, user: saveUser, wallet},
        message: "User Account Created Successfully"
    }
    return resData

}

@Post("/users/signin")
public async agentSignin(@Body() reqBody: ILoginDto) : Promise<IServerResponse<IAccessTokenData>>{
    const {emailAddress, password} = reqBody
    const connection = await getFreshConnection()
    const userRepo = connection.getRepository(User)
    const userExist = await userRepo.findOne({ emailAddress })
    if(!userExist){
        throw new BadRequestError('Invalid Login credentials')
    }
    const match = await bcrypt.compare(password, userExist.passwordHash);
    if (!match) {
      throw new UnauthorizedRequestError("User credentials are wrong.");
    }

    const signinToken = await TokenService.getAccessToken(userExist)
    const wallet = await WalletService.userWallet(userExist.id)
    const resData : IServerResponse<IAccessTokenData> = {
        status: true,
        data: { token: signinToken.token, user: userExist, wallet, refreshToken: signinToken.refreshToken},
        message: 'Login Successfully' 
    }
    return resData

}

}