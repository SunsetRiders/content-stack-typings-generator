import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';
import { Configuration, isValid } from './configuration';

export class ConfigurationFactory {

  constructor(private readonly _config: Partial<Configuration> = ConfigurationFactory.readOptionsFromConsole()) { }

  getUsage() {
    return commandLineUsage([
      { 
        header: 'Typings Generator for ContentStack Content Types'
      },
      {
        header: 'Options',
        optionList: [
          { name: 'apikey', description: 'The API KEY for the Content Stack' },
          { name: 'authtoken', description: 'The AUTH TOKEN for the Content Stack' },
          { name: 'output', description: 'The output directory for the generated typings' }
        ]
      }
    ]);
  }

  create(): Configuration | null {
    const config = this._config;

    return isValid(config) ? config : null;
  }

  static readOptionsFromConsole() {
    const optionDefinitions = [
      { name: 'apikey', type: String },
      { name: 'authtoken', type: String },
      { name: 'output', alias: 'o', type: String }
    ];

    return <Configuration>commandLineArgs(optionDefinitions);
  }
}
