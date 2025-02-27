import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import type { Config } from "./config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<Config, true>);

  app.enableCors({
    origin: configService.get("CORS_ORIGIN", { infer: true }),
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.get("PORT", { infer: true }), () => {
    console.info(`Server is started on port ${configService.get("PORT", { infer: true })}`);
  });
}
bootstrap();
