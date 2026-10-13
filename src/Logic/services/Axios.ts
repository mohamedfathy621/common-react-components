import type { ISendRequest } from "../interfaces/ISendRequests";
import axios from "axios";

export default class Axios implements ISendRequest {
  sendRestAPIRequest<T>(
    requestType: "POST" | "PUT" | "GET" | "DELETE",
    url: string,
    body?: unknown,
  ): Promise<{ status: number; data: T }> {
    const response = axios.request({ method: requestType, url, data: body });
    return response;
  }
}
