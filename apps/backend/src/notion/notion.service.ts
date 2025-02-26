import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Client } from "@notionhq/client";
import type { AppendBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints";
import { Cache } from "cache-manager";

import type { Config } from "src/config";

import { buildTableRow } from "./utils";

@Injectable()
export class NotionService {
  private notionClient: Client;

  constructor(
    private configService: ConfigService<Config, true>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.notionClient = new Client({
      auth: this.configService.get("NOTION_TOKEN", { infer: true }),
    });
  }

  async getAddresses(): Promise<string[]> {
    try {
      const { results } = await this.notionClient.blocks.children.list({
        block_id: this.configService.get("NOTION_BLOCK_ID", { infer: true }),
      });

      return results
        .filter((result) => "type" in result && result.type === "table_row")
        .flatMap((row) => (row.table_row.cells[0]?.[0] ? [row.table_row.cells[0][0]] : []))
        .filter((item) => item.type === "text")
        .map(({ text }) => text.content);
    } catch (error) {
      console.error("Failed to fetch addresses", error);
      throw new Error("Failed to fetch addresses");
    }
  }

  async appendAddress(...addresses: string[]): Promise<AppendBlockChildrenResponse> {
    try {
      const response = await this.notionClient.blocks.children.append({
        block_id: this.configService.get("NOTION_BLOCK_ID", { infer: true }),
        children: addresses.map((address) => buildTableRow(address)),
      });

      await this.clearCache();

      return response;
    } catch (error) {
      console.error("Failed to append address", error);
      throw new Error("Failed to append address");
    }
  }

  private async clearCache() {
    await this.cacheManager.clear();
  }
}
