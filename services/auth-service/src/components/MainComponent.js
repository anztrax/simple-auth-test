import AuthController from 'src/controllers/AuthController';

import BuyerAccessor from 'src/database/accessors/BuyerAccessor';
import BuyerService from 'src/services/BuyerService';
import CreditSummaryAccessor from "src/database/accessors/CreditSummaryAccessor";
import CreditSummaryService from "../services/CreditSummaryService";
import CreditSummaryController from "../controllers/CreditSummaryController";

class MainComponent{
  constructor(){
    this.buyerAccessor = new BuyerAccessor();
    this.buyerService = new BuyerService(this.buyerAccessor);

    this.creditSummaryAccessor = new CreditSummaryAccessor();
    this.creditSummaryService = new CreditSummaryService(this.creditSummaryAccessor);

    this.authController = new AuthController(this.buyerService);
    this.creditSummaryController = new CreditSummaryController(this.creditSummaryService);
  }

  getAuthController = () => {
    return this.authController;
  };

  getCreditSummaryController = () => {
    return this.creditSummaryController;
  };
}

export default MainComponent;