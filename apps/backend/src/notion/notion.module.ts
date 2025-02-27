import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { Config } from "src/config";

import { NotionController } from "./notion.controller";
import { NotionService } from "./notion.service";

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<Config, true>) => ({
        ttl: configService.get("CACHE_LIFETIME", { infer: true }),
        max: configService.get("CACHE_MAX_ITEMS", { infer: true }),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [NotionController],
  providers: [NotionService],
})
export class NotionModule {}
