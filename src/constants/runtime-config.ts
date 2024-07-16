import { lazy } from '../common/utils/lazy';
import { RuntimeConfig } from '../RuntimeConfig';

function convert<T = string | boolean>(config: string, converter: (s: string) => T): T {
  return converter(config);
}
function assertDefined<T = string | boolean>(config: string | undefined, converter?: (s: string) => T): T {
  if (config === undefined) throw new Error('Config is missing!');
  return convert(config, converter ?? (((s: string) => s) as unknown as (s: string) => T));
}

// Using serve time constants
// See: https://nextjs.org/docs/basic-features/environment-variables
export const RuntimeWindowConfig = '___config___';

export const RuntimeConfigInstance = lazy<RuntimeConfig>(() => {
  let override = {};

  if (typeof window !== 'undefined') {
    override = (global as any)[RuntimeWindowConfig] ?? override;
    console.debug('Config override', override);
  }
  return {
    authentication: {
      domain: assertDefined(process.env.NEXT_PUBLIC__AUTH__DOMAIN),
      clientId: assertDefined(process.env.NEXT_PUBLIC__AUTH__CLIENT_ID),
      audience: assertDefined(process.env.NEXT_PUBLIC__AUTH__AUDIENCE),
      redirectUri: process.env.NEXT_PUBLIC__AUTH__REDIRECT_URL,
    },
    userApiBaseUrl: assertDefined(process.env.NEXT_PUBLIC__APIS__USER__BASE_URL),
    plansApiBaseUrl: assertDefined(process.env.NEXT_PUBLIC__APIS__PLANS__BASE_URL),
    company: assertDefined(process.env.NEXT_PUBLIC__CONFIG__COMPANY),
    showTestSection: assertDefined(process.env.NEXT_PUBLIC__SHOW__TEST__SECTION, (val) => val === 'true'),
    ...override,
  };
});
