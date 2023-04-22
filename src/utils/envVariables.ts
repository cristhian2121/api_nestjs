import { z } from 'zod';

const envVariables = z.object({
  PROVIDER_HIS_TOKEN: z.string(),
  PROVIDER_GESTION_TOKEN: z.string(),
});

envVariables.parse(process.env);

// overload ProcessEnv interface using zod
declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {
      HIS_STRING_CONNECTION: string;
    }
  }
}
