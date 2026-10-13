import { createInjector } from "typed-inject";
import Axios from "./Logic/services/Axios";
import { TestRequest } from "./Logic/services/testRequests";

class DIcontainer {
  public Injector;

  constructor() {
    this.Injector = createInjector()
      .provideClass("ISendRequest", Axios)
      .provideClass("ITestRequest", TestRequest);
  }
}

const appinjector = new DIcontainer().Injector;

export default appinjector;
