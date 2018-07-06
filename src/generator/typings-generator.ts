import { Configuration } from "../config";
import { loadContentTypes, generateTypeFile, convertAllToDataType } from './task';

export class TypingsGenerator {

  constructor(readonly config: Configuration) {

  }

  async generate() {
    const config = this.config;
    const contentTypes = await loadContentTypes(this.config);
    const library = convertAllToDataType(contentTypes.content_types);

    generateTypeFile(config, library);
  }

}
