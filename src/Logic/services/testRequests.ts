import type { ISendRequest } from "../interfaces/ISendRequests";
import type { ITestingRequests } from "../interfaces/ITestingRequests";

export class TestRequest implements ITestingRequests {
  public static inject = ["ISendRequest"] as const;
  constructor(private sendRequest: ISendRequest) {}

  async fetchUsers(
    name: string,
  ): Promise<{ id: string; name: string; email: string }[]> {
    const response = await this.sendRequest.sendRestAPIRequest<
      {
        id: string;
        name: string;
        email: string;
      }[]
    >("GET", `http://localhost:3000/users?name:contains=${name}`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw Error();
    }
  }

  async fetchProducts(
    name: string,
  ): Promise<{ id: string; name: string; price: number }[]> {
    const response = await this.sendRequest.sendRestAPIRequest<
      {
        id: string;
        name: string;
        price: number;
      }[]
    >("GET", `http://localhost:3000/products?name_like=${name}`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw Error();
    }
  }
}
