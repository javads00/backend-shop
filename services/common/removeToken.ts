import config from '../../config';
import JWT from 'jsonwebtoken';
import { redisClient } from '../../redis/config';

export const removeToken = async (_accessToken: string, refreshToken: string) => {
  try {
    const decodeRefresh = JWT.verify(refreshToken, config.refreshTokenSecret) as {
      id: string;
    };
    if (decodeRefresh) {
      await redisClient.del(decodeRefresh.id);
    }

    return true;
  } catch (error) {
    return false;
  }
};
