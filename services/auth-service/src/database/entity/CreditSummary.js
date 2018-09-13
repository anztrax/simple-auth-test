import { Column, PrimaryGeneratedColumn, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { creditSummaryEnum, defaultCreditSummaryEnum } from 'src/data/staticData';
import { Buyer } from 'src/database/entity/Buyer';

@Entity()
export class CreditSummary {
  @PrimaryGeneratedColumn("uuid")
  id = undefined;

  @Column({type: "text", nullable: false })
  vendorName = '';

  @Column({type: "bigint", nullable: false })
  amount = 0;

  @Column({type: 'enum', enum: creditSummaryEnum , default: defaultCreditSummaryEnum, nullable: false })
  status = '';

  @ManyToOne(type => Buyer)
  @JoinColumn()
  buyer = '';

  @Column({type: 'bigint', nullable: false})
  createdAt = '';

  @Column({type: 'bigint', nullable: false})
  updatedAt = '';

  setCreditSummary = (vendorName, amount, createdAt, updatedAt) => {
    this.vendorName = vendorName;
    this.amount = amount;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  };
}

export default CreditSummary;