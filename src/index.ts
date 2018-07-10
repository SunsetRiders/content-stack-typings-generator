import chalk from 'chalk';
import { ConfigurationFactory } from './config';
import { TypingsGenerator } from './generator';

function main() {
  const configFactory = new ConfigurationFactory();
  const config = configFactory.create();

  if (!config) {
    console.log(configFactory.getUsage());
    return;
  }

  const generator = new TypingsGenerator(config);

  generator.generate();
  console.log(chalk.green('FINISHED'));
}

main();
