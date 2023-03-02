import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { WalletColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { utcNow } from "../utils/core";
import DefualtEntity from "./BaseEntity";


@Entity({ name: Tables.WALLET })
export class Wallet extends DefualtEntity {
  @Column({ name: WalletColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: WalletColumns.USER_ID, nullable: false })
  userId: number;

  @Column({ name: WalletColumns.WALLET_BALANCE_MINOR, nullable: false})
  walletBalanceMinor: number;

  @Column({ name: WalletColumns.CURRENCY, nullable: false})
  currency: string;

  @Column({ name: WalletColumns.TYPE, nullable: false})
  type: string;

  @Column({
    type: "boolean",
    name: WalletColumns.IS_SOFT_DELETED,
    nullable: false,
    default: false,
  })
  isSoftDeleted: boolean;

  

  initialize(userId: number, walletBalanceMinor: number, currency: string, type: string){
    const now = utcNow();
    this.uuid = uuidv4();
    this.userId = userId;
    this.walletBalanceMinor = walletBalanceMinor;
    this.currency = currency;
    this.type = type;
    this.createdAt = now;
    return this
  }
}