import { Middleware } from '@trainerhelper/plans-api';
import { AuthContextValue } from '../../context/Auth0Context';

export function createJwtAuthMiddleware(auth: AuthContextValue): Middleware {
  return {
    pre: async (context) => {
      const accessToken = auth.user?.getToken && (await auth.user.getToken());
      context.init.headers = {
        ...context.init.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    },
  };
}
