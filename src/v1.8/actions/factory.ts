import { BigNumberish } from "ethers";
import { Address } from "../..";

type FactoryFunctionName =
  | "subscribeToCollections"
  | "unsubscribeFromCollections"
  | "setAuthorization"
  | "revokeAllAuthorizations";

export type FactoryOperation = {
  functionName: FactoryFunctionName;
  params: BigNumberish[] | [Address, BigNumberish] | [];
};

export class FactoryActions {
  constructor() {}

  subscribeToCollections(params: BigNumberish[]): FactoryOperation {
    return {
      functionName: "subscribeToCollections",
      params,
    };
  }

  unsubscribeFromCollections(params: BigNumberish[]): FactoryOperation {
    return {
      functionName: "unsubscribeFromCollections",
      params,
    };
  }

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
