interface BaseNetworkServiceDependencies {
  baseURL: string;
}

export abstract class BaseNetworkService {
  private baseURL: string;

  constructor({ baseURL }: BaseNetworkServiceDependencies) {
    this.baseURL = baseURL;
  }

  private async request<T, B = Record<string, unknown>>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    body?: B,
    headers: Record<string, string> = {},
  ): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      console.error("Request error:", error);
      throw error;
    }
  }

  protected get<T>(endpoint: string, headers?: Record<string, string>) {
    return this.request<T>(endpoint, "GET", undefined, headers);
  }

  protected post<T, B>(endpoint: string, body: B, headers?: Record<string, string>) {
    return this.request<T, B>(endpoint, "POST", body, headers);
  }

  protected put<T, B>(endpoint: string, body: B, headers?: Record<string, string>) {
    return this.request<T, B>(endpoint, "PUT", body, headers);
  }

  protected delete<T>(endpoint: string, headers?: Record<string, string>) {
    return this.request<T>(endpoint, "DELETE", undefined, headers);
  }
}
