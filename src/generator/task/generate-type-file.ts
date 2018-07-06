import { DataTypeLibrary } from './../object-model/data-type-library';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import handlebars, { TemplateDelegate } from 'handlebars';
import { Configuration } from '../../config';
import { ContentType } from '../../content-stack';
import { DataTypeDefinition } from '../object-model';

function toPascalCase(name: string): string {
  const names = name.split('_');
  const pascalNames = names.map(x => x.slice(0, 1).toUpperCase() + (x.length > 1 ? x.slice(1) : ''));

  return pascalNames.join('');
}

function readFile(path: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.toString());
      }
    });
  });
}

function writeFile(path: string, content: string): Promise<boolean> {
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

async function loadTemplate() {
  const content = await readFile(path.resolve(__dirname, '../../../template/file-template.hbs'));

  return handlebars.compile(content);
}

let template: TemplateDelegate<DataTypeDefinition[]> | undefined;

handlebars.registerHelper('toPascalCase', toPascalCase);

export async function generateTypeFile(config: Configuration, library: DataTypeLibrary) {
  if (!template) {
    template = await loadTemplate();
  }

  const rootFileName = path.resolve(config.out, `content-stack.model.ts`);

  try {
    console.log(chalk.gray('Generating file: '), chalk.bgYellow(rootFileName), ' ');
    
    const generatedFileContent = template(library.allTypes);

    await writeFile(rootFileName, generatedFileContent);

  } catch (e) {
    console.error(chalk.red(e.message));
    throw e;
  }
}
