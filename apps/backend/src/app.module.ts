import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { validate } from "./config";

import { NotionModule } from "./notion/notion.module";

import { AppController } from "./app.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    NotionModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
