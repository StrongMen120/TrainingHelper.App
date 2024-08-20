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
    company: assertDefined(process.env.NEXT_PUBLIC__CONFIG__COMPANY),
    showTestSection: assertDefined(process.env.NEXT_PUBLIC__SHOW__TEST__SECTION, (val) => val === 'true'),
    ...override,
  };
});
