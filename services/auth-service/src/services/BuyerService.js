import { registerDataSchema, loginDataSchema, validateData } from 'src/validator/validator';
import bcrypt from 'bcrypt';
import config from 'src/config';
import isEmpty from 'lodash/isEmpty';
import jwt from 'jsonwebtoken';
import Nexmo from 'nexmo';
import { verifyToken } from 'src/utils';

const ERROR_MESSAGES = {
  LOGIN_ERROR : 'email / password combination is not valid',
  EMAIL_ALREADdoGenerateTokenY_REGISTERED: 'email is already registered , please do login',
  REGISTER_EMPTY_PAYLOAD : 'buyer data is empty'
};

class BuyerService{
  constructor(buyerAccessor) {
    this.buyerAccessor = buyerAccessor;

    this.nexmo = new Nexmo({
      apiKey: config.nexmo.apiKey,
      apiSecret: config.nexmo.apiSecret
    });
  }

  register = (buyerData) => {
    return new Promise((resolve, reject) => {
      if(!isEmpty(buyerData)){
        const { error, value } = validateData(buyerData, registerDataSchema);
        if(error){
          resolve({
            type : 'error',
            error
          })
        }else{
          bcrypt.hash(value.password, config.saltRounds).then(hashedPass => {
            const finalValue = {
              ...value,
              password: hashedPass
            };

            this.buyerAccessor.getByEmail(value.email).then(existingData => {
              if(!isEmpty(existingData)){
                resolve({
                  type : 'error',
                  error : ERROR_MESSAGES.EMAIL_ALREADY_REGISTERED
                })
              }

              this.buyerAccessor.insert(finalValue).then(insertedData => {
                resolve(insertedData);
              }).catch(err => {
                reject(err);
              });
            });
          }).catch(err => {
            reject(err);
          });
        }
      }else{
        resolve({
          type : 'error',
          error: ERROR_MESSAGES.REGISTER_EMPTY_PAYLOAD
        })
      }
    });
  };

  login = (buyerData) => {
    return new Promise((resolve, reject) => {
      if(!isEmpty(buyerData)) {
        const { error, value } = validateData(buyerData, loginDataSchema);
        if(error){
          resolve({
            type : 'error',
            error
          })
        }else{
          //check if token is available or not getByToken

          return this.buyerAccessor.getByEmail(value.email).then(userData => {
            if(!isEmpty(userData)){
              this.normalLogin(value,userData).then(result => {
                resolve(result);
              });
            }else{
              resolve({
                type : 'error',
                error : ERROR_MESSAGES.EMAIL_ALREADY_REGISTERED
              });
            }
          }).catch(err => {
            reject(err);
          });
        }
      }
    });
  };

  normalLogin = (value, userData) => {
    return new Promise((resolve, reject) => {
      const { password } = userData;
      bcrypt.compare(value.password, password).then((res) => {
        if(res === true){
          this.doGenerateToken(userData).then(result => {
            resolve(result);
          });
        }else{
          resolve({
            type : 'error',
            error : ERROR_MESSAGES.EMAIL_ALREADY_REGISTERED
          });
        }
      }).catch(err => {
        reject(err);
      });
    });
  };

  doGenerateToken = (userData) => {
    return new Promise((resolve, reject) => {
      const payload = {
        ...userData
      };
      const validToken = jwt.sign(payload, config.jwt.secretKey, {
        expiresIn: config.jwt.expiresIn
      });

      this.buyerAccessor.updateToken({email: userData.email, JWTToken : validToken}).then(data => {
        resolve({
          success: true,
          message: 'token success generated',
          token: validToken
        });
      }).catch(err => {
        reject(err);
      });
    });
  };


  getRequestId = ({ JWTToken }) => {
    return new Promise((resolve, reject) => {
      verifyToken(JWTToken, config.jwt.secretKey).then(result => {
        if(result.type === 'success'){
          const { phoneNumber } = result.decoded;
          this.doRequestGetRequestId(phoneNumber).then(result => {
            resolve(result);
          }).catch(err => {
            reject(err);
          });
        }else{
          resolve(result);
        }
      });
    });
  };


  verifyOTPCode = ({ JWTToken, requestId, OTPCode }) => {
    return new Promise((resolve, reject) => {
      verifyToken(JWTToken, config.jwt.secretKey).then(result => {
        if(result.type === 'success'){
          const { email } = result.decoded;
          this.nexmo.verify.check({request_id: requestId, code: OTPCode}, (err, result) => {
            if(err) {
              reject(err);
            } else {
              if(result && result.status === '0') { // Success!
                this.buyerAccessor.updateVerifiedStatus({ email, isVerified: true }).then(result => {
                  resolve({
                    message: 'Account verified'
                  });
                }).catch(err => {
                  reject(err);
                })
              } else {
                reject(err);
              }
            }
          });
        }
      });
    });
  };

  doRequestGetRequestId = (phoneNumber) => {
    return new Promise((resolve, reject) => {
      this.nexmo.verify.request({number : phoneNumber,  brand: 'Empat Kali'}, (err, result) => {
        if(err) {
          reject(err);
        } else {
          let requestId = result.request_id;
          if(result.status === '0') {
            resolve({ requestId }); // Success! Now, have your user enter the PIN
          }
        }
      });
    });
  };
}

export default BuyerService;