import fs from "fs";
import path from "path";
import handlebars, { TemplateDelegate } from "handlebars";
import { DataTypeLibrary } from "../object-model";

export class ContentStackModelTemplate {
  static readonly templateFileName = '../../../template/file-template.hbs';
  private _template: TemplateDelegate<DataTypeLibrary> | undefined;

  private readFile(path: string): Promise<string> {
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

  private async loadTemplateContent() {
    return await this.readFile(path.resolve(__dirname, ContentStackModelTemplate.templateFileName));
  }

  async loadTemplate() {
    if (!this._template) {
      const templateContent = await this.loadTemplateContent();

      this._template = handlebars.compile(templateContent);
    }

    return this._template;
  }

  async process(library: DataTypeLibrary) {
    const template = await this.loadTemplate();

    return template(library);
  }
}
