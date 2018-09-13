import {getConnection} from "typeorm";
import { CreditSummary } from "src/database/entity/CreditSummary";

class CreditSummaryAccessor{
  static getRepo = () => {
    return getConnection().getRepository(CreditSummary);
  };

  constructor(buyerAccessor){
    this.buyerAccessor = buyerAccessor;
  }

  gets = (buyerId) => {
    return new Promise((resolve, reject) => {
      CreditSummaryAccessor
        .getRepo()
        .createQueryBuilder("CreditSummary")
        .leftJoinAndSelect("CreditSummary.buyer", "buyer")
        .where("buyer.id = :id AND status = 'pending'", { id: buyerId })
        .getMany()
        .then(result => {
          resolve(result);
        }).catch(err => {
        reject(err);
      })
    });
  };

  pay = (buyerId, transactionId) => {
    return new Promise((resolve, reject) => {
      CreditSummaryAccessor
        .getRepo()
        .createQueryBuilder("CreditSummary")
        .leftJoinAndSelect("CreditSummary.buyer", "buyer")
        .where("buyer.id = :buyerId AND status = 'pending' AND CreditSummary.id = :transactionId ", { buyerId, transactionId  })
        .getOne()
        .then(existingResult => {
          const parsedAmount = (parseInt(existingResult.amount,10));
          const quarterAmount = (parsedAmount / 4);
          const updatedAmount = (parsedAmount - quarterAmount > 0) ? parsedAmount - quarterAmount  : 0;
          this.updateAmount(
            transactionId,
            {
              amount : updatedAmount
            }
          ).then(result => {
            resolve(result);
          }).catch(err => {
            reject(err);
          })
        }).catch(err => {
        reject(err);
      })
    });
  };

  updateAmount = async (id, field) => {
    let status = await CreditSummaryAccessor
      .getRepo()
      .createQueryBuilder()
      .update(CreditSummary)
      .set({ ...field, updatedAt: Date.now() })
      .where("id = :id", { id })
      .execute();
    return status;
  };
}

export default CreditSummaryAccessor;