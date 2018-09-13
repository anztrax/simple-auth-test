class CreditSummaryController {
  constructor(creditSummaryService) {
    this.creditSummaryService = creditSummaryService;
  }

  gets = (request, handler) => {
    return new Promise((resolve, reject) => {
      const tokenPayload = request.payload;
      this.creditSummaryService.gets(tokenPayload).then(data => {
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
    });
  };

  pay = (request, handler) => {
    return new Promise((resolve, reject) => {
      const tokenPayload = request.payload;
      this.creditSummaryService.pay(tokenPayload).then(data => {
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
    });
  };
}



export default CreditSummaryController;