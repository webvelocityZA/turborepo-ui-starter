export type APIResponse<T> = {
  data: T;
  status: string;
};

export interface GetAddressesResponseData<T> extends APIResponse<T> {
  nextCursor: string | null;
}
