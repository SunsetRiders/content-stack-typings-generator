import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import shell from 'shelljs';
import { Configuration } from '../../config';
import { DataTypeLibrary } from '../object-model';
import { ContentStackModelTemplate } from "./content-stack-model-template";

export class ContentStackTypingsGenerator {

  constructor(
    private readonly template: ContentStackModelTemplate = new ContentStackModelTemplate()) {

  }

  private writeFile(path: string, content: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      fs.writeFile(path, content, err => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }

  private async ensureDirectoryExists(directory: string) {
    await shell.mkdir("-p", directory);
  }

  async generateFile(config: Configuration, library: DataTypeLibrary) {
    const rootFileName = path.resolve(config.output);
    const directory = path.dirname(rootFileName);

    try {
      console.log(chalk.gray('Generating file...'));

      await this.ensureDirectoryExists(directory);
      await this.writeFile(rootFileName, await this.template.process(library));

      console.log(chalk.green(`File generated: ${rootFileName}`));

    } catch (e) {
      console.error(chalk.red(e.message));
      throw e;
    }
  }
}
