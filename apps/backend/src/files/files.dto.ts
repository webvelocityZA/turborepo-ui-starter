import { IsNotEmpty, IsString } from "class-validator";

export class GetFileParams {
  @IsString()
  @IsNotEmpty()
  filename: string;
}
