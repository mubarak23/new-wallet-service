import { UrlShortLer } from "../entity/UrlShortLer"
import { getFreshConnection } from "../db"
import { IServerResponse } from "../interfaces/IServerResponse";
import { Put, Request, Route, Security, Body, Post, Tags, Get, Path, Delete } from "tsoa";
import * as Utils from "../utils/core"
import { BadRequestError, UnprocessableEntityError } from "../utils/error-response-types";
import { IUrlShortler } from "../interfaces/IUrlShortler";
import { INewUrlShortLer } from "../dto/INewUrlShortLer";
import { nanoid } from "nanoid"
import { IUpdateUrlShortLer } from "../dto/IUpdateUrlShortLer";

@Route("/api/url")
@Tags("URL")
export class UrlShortLerController {

    @Get('/:uniqueCode')
    public async handleFetchUrlDetails( @Path("uniqueCode") uniqueCode: string ): Promise<IServerResponse<IUrlShortler>>{
        const connection = await getFreshConnection()
        const urlRepo = connection.getRepository(UrlShortLer)

        const urlDetails = await urlRepo.findOne({ uniqueCode })
        if(!urlDetails){
            throw new UnprocessableEntityError('Url shortler detail does not exits')
        }

        const resData : IServerResponse<IUrlShortler> = {
            status: true,
            data: urlDetails,
            message: "URL Shortler Details"
        }
        return resData

    }

//     @Post('/new')
//     public async handleNewUrlShortler(@Body() reqBody: INewUrlShortLer): Promise<IServerResponse<void>>{
//     const { longUrl } = reqBody
//     const connection = await getFreshConnection()
//     const urlRepo = connection.getRepository(UrlShortLer)
    
//     const uniqueCode = nanoid(5)
//     const shortUrl = process.env.SHORT_URL ||  `http://localhost:3200/${uniqueCode}`

//     const urlExist = await urlRepo.findOne({ longUrl})
//     if(urlExist){
//         throw new BadRequestError(' URL shortler Already Exist')
//     }

//     const newURLShortLer = new UrlShortLer().initialize(uniqueCode, longUrl, shortUrl)
//     await urlRepo.save(newURLShortLer)
    
//     const resData :  IServerResponse<void>  ={
//         status: true
//     }
//     return resData
// }


@Put('/update')
public async handleUpdateUrlShortler(@Body() reqBody: IUpdateUrlShortLer): Promise<IServerResponse<void>>{
const { longUrl, uniqueCode } = reqBody
const connection = await getFreshConnection()
const urlRepo = connection.getRepository(UrlShortLer)

const shortUrl = process.env.SHORT_URL ||  `http://localhost:3200/${uniqueCode}`

const urlExist = await urlRepo.findOne({ uniqueCode})
if(!urlExist){
    throw new BadRequestError(' URL shortler Does Not Exist')
}

await urlRepo.createQueryBuilder()
    .update(UrlShortLer)
    .set({ longUrl: longUrl })
    .where({ uniqueCode: uniqueCode })
    .execute()

const resData :  IServerResponse<void>  ={
    status: true
}
return resData
}

@Delete('/:uniqueCode')
public async handleDeleteUrl( @Path("uniqueCode") uniqueCode: string ): Promise<IServerResponse<void>>{
    const connection = await getFreshConnection()
    const urlRepo = connection.getRepository(UrlShortLer)

    const urlDetails = await urlRepo.findOne({ uniqueCode })
    if(!urlDetails){
        throw new UnprocessableEntityError('Url shortler detail does not exits')
    }

    await urlRepo.createQueryBuilder()
    .update(UrlShortLer)
    .set({ isSoftDeleted: true })
    .where({ uniqueCode: uniqueCode })
    .execute()

    const resData : IServerResponse<void> = {
        status: true,
        message: "URL Deleted"
    }
    return resData

}





}