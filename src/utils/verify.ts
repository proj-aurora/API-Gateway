import { verify } from 'jsonwebtoken';
import { jwtConstants } from './secret.constants';

const tokenVerify = (token: string) => {
  try {
    if (token == '' || token == null) {
      return false;
    } else {
      return verify(token, jwtConstants.secret);
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default tokenVerify;
