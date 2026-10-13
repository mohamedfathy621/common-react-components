export interface ISendRequest {
  sendRestAPIRequest<T>(
    requestType: "POST" | "PUT" | "GET" | "DELETE",
    url: string,
    body?: unknown,
  ): Promise<{ status: number; data: T }>;
}
