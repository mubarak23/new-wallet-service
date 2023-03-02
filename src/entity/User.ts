import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { UserColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { utcNow } from "../utils/core";
import DefualtEntity from "./BaseEntity";


@Entity({ name: Tables.USERS })
export class User extends DefualtEntity {
  @Column({ name: UserColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: UserColumns.FIRST_NAME, nullable: false })
  firstName: string;

  @Column({ name: UserColumns.LAST_NAME, nullable: false})
  lastName: string;

  @Column({ name: UserColumns.EMAIL_ADDRESS, nullable: false})
  emailAddress: string;

  @Column({ name: UserColumns.PHONE_NUMBER, nullable: false})
  phoneNumber: string;

  @Column({ name: UserColumns.PASSWORD_HASH, nullable: false})
  passwordHash: string;

  @Column({ name: UserColumns.ROLE, nullable: false})
  role: string;

  @Column({
    type: "boolean",
    name: UserColumns.IS_SOFT_DELETED,
    nullable: false,
    default: false,
  })
  isSoftDeleted: boolean;

  

  initialize(firstName: string, lastName: string, emailAddress: string, phoneNumber: string, passwordHash: string, role: string){
    const now = utcNow();
    this.uuid = uuidv4();
    this.firstName = firstName;
    this.lastName = lastName;
    this.emailAddress = emailAddress;
    this.phoneNumber = phoneNumber;
    this.passwordHash = passwordHash;
    this.role = role;
    this.createdAt = now;
    return this
  }
}