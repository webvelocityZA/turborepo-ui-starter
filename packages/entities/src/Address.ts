import { type Address as TonAddress, address } from "@ton/ton";

export class Address {
  public readonly key;

  public readonly base64;

  protected readonly tonAddress: TonAddress;

  constructor(source: string) {
    this.tonAddress = address(source.toString());

    this.base64 = this.tonAddress.toString({ urlSafe: true, bounceable: true });
    this.key = this.base64;
  }

  public toString(isUserFriendly = true, isUrlSafe = true) {
    if (!isUserFriendly) return this.tonAddress.toRawString();

    return this.tonAddress.toString({
      urlSafe: isUrlSafe,
      bounceable: true,
    });
  }

  public static isValid(source: string) {
    return Address.safeCreate(source) != null;
  }

  public static safeCreate(source: string) {
    try {
      return new Address(source);
    } catch {
      return null;
    }
  }
}
