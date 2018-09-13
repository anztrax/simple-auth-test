import isNil from "lodash/isNil";
import jwt from "jsonwebtoken";

const updateDataFieldIfExist = (data, field, fieldValue) => {
  data[field] = (!isNil(fieldValue)) ? fieldValue : data[field];
};

const verifyToken = (JWTToken, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(JWTToken, secretKey, (err, decoded) => {
      if (err) {
        resolve({
          type: 'error',
          error: 'Failed to authenticate token.'
        });
      } else {
        resolve({
          type: 'success',
          decoded
        })
      }
    });
  });
};

export {
  updateDataFieldIfExist,
  verifyToken
};
