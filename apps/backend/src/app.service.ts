import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { Config } from "./config";

@Injectable()
export class AppService {
  constructor(private configService: ConfigService<Config, true>) {}
  getHello(): string {
    const notionToken = this.configService.get("NOTION_TOKEN", { infer: true });

    return "Hello World!";
  }
}
