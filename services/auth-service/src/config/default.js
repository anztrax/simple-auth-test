const config = {
  baseUrl: 'localhost',
  port : '6100',

  nexmo: {
    apiKey: '49597eb7',
    apiSecret: '84e391ef',
  },

  saltRounds : 12,

  jwt : {
    secretKey: 'NoS@S3cR3T!!',
    expiresIn: 60*60*24
  }
};

export default config;