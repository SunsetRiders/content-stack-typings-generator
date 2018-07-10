import { Configuration } from "../config";
import { loadContentTypes, convertAllToDataType, ContentStackTypingsGenerator } from './task';

export class TypingsGenerator {

  constructor(
    readonly config: Configuration,
    readonly generator: ContentStackTypingsGenerator = new ContentStackTypingsGenerator()) {

  }

  async generate() {
    const config = this.config;
    const contentTypes = await loadContentTypes(this.config);
    const library = convertAllToDataType(contentTypes.content_types);

    await this.generator.generateFile(config, library);
  }

}
