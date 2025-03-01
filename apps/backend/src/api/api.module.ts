import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { Config } from "src/config";

import { ApiController } from "./api.controller";
import { ApiService } from "./api.service";

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
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
