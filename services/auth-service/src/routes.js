import Joi from 'joi';

const routes = (mainComponent) => {
  const authController = mainComponent.getAuthController();
  const creditSummaryController = mainComponent.getCreditSummaryController();

  return [
    //questions groups
    {
      path:'/register',
      method:'POST',
      handler: authController.register,
      options: {
        description: 'Register Buyer',
        tags: ['api'],
      }
    },
    {
      path:'/login',
      method:'POST',
      handler: authController.login,
      options: {
        description: 'Login Buyer',
        tags: ['api'],
      }
    },
    {
      path: '/user/detail/${userDetailId}',
      method:'POST',
      handler: authController.getUser,
      options: {
        description: 'User Detail Id',
        tags: ['api'],
      }
    },
    {
      path: '/requestOTPCode',
      method:'POST',
      handler: authController.getRequestId,
      options: {
        description: 'Request OTP Code',
        tags: ['api'],
      }
    },
    {
      path: '/verifyOTPCode',
      method:'POST',
      handler: authController.verifyOTPCode,
      options: {
        description: 'Request OTP Code',
        tags: ['api'],
      }
    },

    //credit summary things
    {
      path: '/transactions',
      method:'POST',
      handler: creditSummaryController.gets,
      options: {
        description: 'Get Transactions',
        tags: ['api'],
      }
    },
    {
      path: '/pay',
      method:'POST',
      handler: creditSummaryController.pay,
      options: {
        description: 'Pay Transaction',
        tags: ['api'],
      }
    }
  ];
};

export default routes;