export interface ITestingRequests {
  fetchUsers(
    name: string,
  ): Promise<{ id: string; name: string; email: string }[]>;
  fetchProducts(
    name: string,
  ): Promise<{ id: string; name: string; price: number }[]>;
}
