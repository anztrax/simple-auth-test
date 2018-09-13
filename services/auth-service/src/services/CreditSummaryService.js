import { verifyToken } from 'src/utils';
import config from 'src/config';

class CreditSummaryService{
  constructor(creditSummaryAccessor){
    this.creditSummaryAccessor = creditSummaryAccessor;
  }

  gets = ({ JWTToken }) => {
    return new Promise((resolve, reject) => {
      verifyToken(JWTToken, config.jwt.secretKey).then(result => {
        if(result.type === 'success') {
          const { id, email } = result.decoded;
          return this.creditSummaryAccessor.gets(id).then(creditResult => {
            resolve(creditResult);
          }).catch(err => {
            reject(err);
          });
        }
      }).catch(err => {
        reject(err);
      });;
    });
  };

  pay = ({ JWTToken, amount, transactionId }) => {
    return new Promise((resolve, reject) => {
      verifyToken(JWTToken, config.jwt.secretKey).then(result => {
        if(result.type === 'success') {
          const { id, email } = result.decoded;
          return this.creditSummaryAccessor.pay(id, transactionId).then(creditResult => {
            resolve(creditResult);
          }).catch(err => {
            reject(err);
          });
        }else{
        }
      }).catch(err => {
        reject(err);
      });
    });
  };
}

export default CreditSummaryService;