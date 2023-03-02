import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { ShortUrlColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { utcNow } from "../utils/core";
import DefualtEntity from "./BaseEntity";


@Entity({ name: Tables.UrlShortLer })
export class UrlShortLer extends DefualtEntity {
  @Column({ name: ShortUrlColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: ShortUrlColumns.UNIQUE_CODE, nullable: false })
  uniqueCode: string;

  @Column({ name: ShortUrlColumns.LONG_URL, nullable: false})
  longUrl: string;

  @Column({ name: ShortUrlColumns.SHORT_URL, nullable: false})
  shortUrl: string;

  @Column({
    type: "boolean",
    name: ShortUrlColumns.IS_SOFT_DELETED,
    nullable: false,
    default: false,
  })
  isSoftDeleted: boolean;

  

  initialize(uniqueCode: string, longUrl: string, shortUrl: string){
    const now = utcNow();
    this.uuid = uuidv4();
    this.uniqueCode = uniqueCode;
    this.longUrl = longUrl;
    this.shortUrl = shortUrl;
    this.createdAt = now;
    return this
  }
}