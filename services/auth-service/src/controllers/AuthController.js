import Boom from 'boom';

class AuthController{
  constructor(buyerService){
    this.buyerService = buyerService;
  }

  register = (request, handler) => {
    return new Promise((resolve, reject) => {
      try {
        const registerUserData = request.payload;
        this.buyerService.register(registerUserData).then(buyerData => {
          const { type } = buyerData;
          let result = '';
          if(type === 'error'){
            result = buyerData.error.toString();
          }else {
            result = handler.response(buyerData);
          }
          resolve(result);
        }).catch(err => {
          reject(err);
        });
      } catch (err) {
        reject(Boom.badImplementation());
      }
    });
  };

  login = (request, handler) => {
    return new Promise((resolve, reject) => {
      try {
        const loginUserData = request.payload;
        this.buyerService.login(loginUserData).then(data => {
          const { type } = data;
          let result = '';
          if(type === 'error'){
            result = data.toString();
          }else {
            result = handler.response(data);
          }
          resolve(result);
        }).catch(err => {
          reject(err);
        });
      } catch (err) {
        reject(Boom.badImplementation());
      }
    });
  };

  getRequestId = (request, handler) => {
    return new Promise((resolve, reject) => {
      try {
        const tokenPayload = request.payload;
        this.buyerService.getRequestId(tokenPayload).then(data => {
          const { type } = data;
          let result = '';
          if(type === 'error'){
            result = data.toString();
          }else {
            result = handler.response(data);
          }
          resolve(result);
        }).catch(err => {
          reject(err);
        });
      } catch (err) {
        reject(Boom.badImplementation());
      }
    });
  };

  verifyOTPCode = (request, handler) => {
    return new Promise((resolve, reject) => {
      try {
        const verifyTokenPayload = request.payload;
        this.buyerService.verifyOTPCode(verifyTokenPayload).then(data => {
          const { type } = data;
          let result = '';
          if(type === 'error'){
            result = data.toString();
          }else {
            result = handler.response(data);
          }
          resolve(result);
        }).catch(err => {
          reject(err);
        });
      } catch (err) {
        reject(Boom.badImplementation());
      }
    });
  };

  getUser = (request, handler) => {
    return new Promise((resolve, reject) => {
      try {
        resolve(true);
      } catch (err) {
        reject(Boom.badImplementation());
      }
    });
  };
}

export default AuthController;