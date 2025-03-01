import { ArrayNotEmpty, IsArray, IsString, Length, MaxLength, MinLength } from "class-validator";

export class AppendAddressesDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @Length(48, 48, {
    each: true,
    message: "Each address must be 48 characters long",
  })
  addresses: string[];
}
