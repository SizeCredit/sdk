import { BigNumberish } from "ethers";
import { Address } from "../..";

type FactoryFunctionName = "setAuthorization" | "revokeAllAuthorizations";

export type FactoryOperation = {
  functionName: FactoryFunctionName;
  params: [Address, BigNumberish] | [];
};

export class FactoryActions {
  constructor() {}

  setAuthorization(params: [Address, BigNumberish]): FactoryOperation {
    return {
      functionName: "setAuthorization",
      params,
    };
  }

  revokeAllAuthorizations(): FactoryOperation {
    return {
      functionName: "revokeAllAuthorizations",
      params: [],
    };
  }
}
