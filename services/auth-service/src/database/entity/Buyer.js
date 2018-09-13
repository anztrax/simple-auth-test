import {Column, PrimaryGeneratedColumn, Entity, OneToMany, JoinColumn} from 'typeorm';
import { IsEmail, IsPhoneNumber, Length,IsString } from "class-validator";
import CreditSummary from "./CreditSummary";

@Entity()
export class Buyer{
  @PrimaryGeneratedColumn("uuid")
  id = undefined;

  @IsString()
  @Length(2, 30)
  @Column({type: "text", nullable: false })
  name = '';

  @IsEmail()
  @Column({type: 'text', nullable : false, unique : true})
  email = '';

  @Column({type: 'text', nullable : false })
  @IsPhoneNumber()
  phoneNumber =  '';

  @Column({type: 'text', nullable : false })
  password = '';

  @Column({type: 'text', nullable : true })
  JWTToken = '';

  @Column({type: 'boolean', nullable : false, default: false })
  isOTPActive = false;

  @Column({type: 'boolean', nullable : false, default: false })
  isVerified = false;

  @Column({type: 'bigint', nullable: false})
  createdAt = '';

  @Column({type: 'bigint', nullable: false})
  updatedAt = '';

  @OneToMany(type => CreditSummary, creditSummary => creditSummary.buyer)
  @JoinColumn()
  creditSummary = '';

  setBuyer = (name, email, phoneNumber, password, createdAt, updatedAt) => {
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  };
}