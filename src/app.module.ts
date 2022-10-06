import { Module } from "@nestjs/common";

import { TwillioModule } from "./twillio/twillio.module.js";

@Module({
  imports: [TwillioModule],
})
export class AppModule {}
