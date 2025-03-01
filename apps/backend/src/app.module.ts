import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { validate } from "./config";

import { ApiModule } from "./api/api.module";
import { FilesModule } from "./files/files.module";

import { AppController } from "./app.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
      envFilePath: [".env.development", ".env"],
    }),
    FilesModule,
    ApiModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
