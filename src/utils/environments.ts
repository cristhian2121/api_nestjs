type TEnvironment = 'DEV' | 'PROD';

export const currentEnvFile: Record<TEnvironment, string> = {
  DEV: '.env.local',
  PROD: '.env.production',
};
