import {getConnection} from "typeorm";
import { Buyer } from 'src/database/entity/Buyer';
import isEmpty from 'lodash/isEmpty';
import { updateDataFieldIfExist } from 'src/utils';

class BuyerAccessor{
  static getRepo = () => {
    return getConnection().getRepository(Buyer);
  };

  insert = ({ name, email, phoneNumber, password }) => {
    return new Promise((resolve, reject) => {
      const newBuyer = new Buyer();
      const currTimestamp = Date.now();
      newBuyer.setBuyer(name, email, phoneNumber, password, currTimestamp, currTimestamp);

      BuyerAccessor.getRepo().save(newBuyer).then(insertedBuyerData => {
        console.log('inserted buyer data : ', insertedBuyerData);
        resolve(insertedBuyerData);
      }).catch(err => {
        reject(err);
      });
    });
  };

  updateToken = ({ email, JWTToken }) =>{
    return new Promise((resolve, reject) => {
      this.getByEmail(email).then(existingData => {
        if(!isEmpty(existingData)){
          updateDataFieldIfExist(existingData,'JWTToken', JWTToken);
          existingData.updatedAt = Date.now();
          BuyerAccessor.getRepo().save(existingData).then(updatedResult => {
            resolve(updatedResult);
          }).catch(err => {
            reject(err);
          });
        }else{
          return reject(`error can'f find data with email : ${email}`);
        }
      }).catch(err => {
        reject(err);
      });
    });
  };

  updateVerifiedStatus = ({ email, isVerified }) => {
    return new Promise((resolve, reject) => {
      this.getByEmail(email).then(existingData => {
        if(!isEmpty(existingData)){
          updateDataFieldIfExist(existingData,'isVerified', isVerified);
          existingData.updatedAt = Date.now();
          BuyerAccessor.getRepo().save(existingData).then(updatedResult => {
            resolve(updatedResult);
          }).catch(err => {
            reject(err);
          });
        }else{
          return reject(`error can'f find data with email : ${email}`);
        }
      }).catch(err => {
        reject(err);
      });
    });
  };

  getByEmail = (email) => {
    return new Promise((resolve, reject) => {
      BuyerAccessor
        .getRepo()
        .createQueryBuilder("Buyer")
        .where("email = :email", { email })
        .getOne()
        .then(result => {
          resolve(result);
        }).catch(err => {
        reject(err);
      })
    });
  };
}

export default BuyerAccessor;