export interface Configuration {
  apikey: string;
  authtoken: string;
  output: string;
}

export function isValid(config: Partial<Configuration>): config is Configuration {
  return (
    !!config.apikey
    && !!config.authtoken
    && !!config.output
  );
}
