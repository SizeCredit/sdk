import { BigNumberish } from "ethers";
import { Address } from "../../index";
import {
  DepositParamsStruct,
  WithdrawParamsStruct,
  BuyCreditLimitParamsStruct,
  BuyCreditMarketParamsStruct,
  SellCreditLimitParamsStruct,
  SellCreditMarketParamsStruct,
  LiquidateWithReplacementParamsStruct,
  SelfLiquidateParamsStruct,
  SetUserConfigurationParamsStruct,
  SetCopyLimitOrderConfigsParamsStruct,
  SetVaultParamsStruct,
} from "../types/ethers-contracts/Size";

export type MarketFunctionName =
  | "deposit"
  | "withdraw"
  | "buyCreditLimit"
  | "buyCreditMarket"
  | "sellCreditLimit"
  | "sellCreditMarket"
  | "liquidateWithReplacement"
  | "selfLiquidate"
  | "setUserConfiguration"
  | "setCopyLimitOrderConfigs"
  | "setVault";

export type MarketOperationParams =
  | DepositParamsStruct
  | WithdrawParamsStruct
  | BuyCreditLimitParamsStruct
  | BuyCreditMarketParamsStruct
  | SellCreditLimitParamsStruct
  | SellCreditMarketParamsStruct
  | LiquidateWithReplacementParamsStruct
  | SelfLiquidateParamsStruct
  | SetUserConfigurationParamsStruct
  | SetCopyLimitOrderConfigsParamsStruct
  | SetVaultParamsStruct;

export type MarketOperation<
  T extends MarketOperationParams = MarketOperationParams,
> = {
  market: Address;
  functionName: MarketFunctionName;
  params: T;
  value?: BigNumberish;
};

export class MarketActions {
  constructor() {}

  deposit(
    market: Address,
    params: DepositParamsStruct,
    value?: BigNumberish,
  ): MarketOperation<DepositParamsStruct> {
    return {
      market,
      functionName: "deposit",
      params,
      value,
    };
  }

  withdraw(
    market: Address,
    params: WithdrawParamsStruct,
  ): MarketOperation<WithdrawParamsStruct> {
    return {
      market,
      functionName: "withdraw",
      params,
    };
  }

  buyCreditLimit(
    market: Address,
    params: BuyCreditLimitParamsStruct,
  ): MarketOperation<BuyCreditLimitParamsStruct> {
    return {
      market,
      functionName: "buyCreditLimit",
      params,
    };
  }

  buyCreditMarket(
    market: Address,
    params: BuyCreditMarketParamsStruct,
  ): MarketOperation<BuyCreditMarketParamsStruct> {
    return {
      market,
      functionName: "buyCreditMarket",
      params,
    };
  }

  sellCreditLimit(
    market: Address,
    params: SellCreditLimitParamsStruct,
  ): MarketOperation<SellCreditLimitParamsStruct> {
    return {
      market,
      functionName: "sellCreditLimit",
      params,
    };
  }

  sellCreditMarket(
    market: Address,
    params: SellCreditMarketParamsStruct,
  ): MarketOperation<SellCreditMarketParamsStruct> {
    return {
      market,
      functionName: "sellCreditMarket",
      params,
    };
  }

  liquidateWithReplacement(
    market: Address,
    params: LiquidateWithReplacementParamsStruct,
  ): MarketOperation<LiquidateWithReplacementParamsStruct> {
    return {
      market,
      functionName: "liquidateWithReplacement",
      params,
    };
  }

  selfLiquidate(
    market: Address,
    params: SelfLiquidateParamsStruct,
  ): MarketOperation<SelfLiquidateParamsStruct> {
    return {
      market,
      functionName: "selfLiquidate",
      params,
    };
  }

  setUserConfiguration(
    market: Address,
    params: SetUserConfigurationParamsStruct,
  ): MarketOperation<SetUserConfigurationParamsStruct> {
    return {
      market,
      functionName: "setUserConfiguration",
      params,
    };
  }

  setCopyLimitOrderConfigs(
    market: Address,
    params: SetCopyLimitOrderConfigsParamsStruct,
  ): MarketOperation<SetCopyLimitOrderConfigsParamsStruct> {
    return {
      market,
      functionName: "setCopyLimitOrderConfigs",
      params,
    };
  }

  setVault(
    market: Address,
    params: SetVaultParamsStruct,
  ): MarketOperation<SetVaultParamsStruct> {
    return {
      market,
      functionName: "setVault",
      params,
    };
  }
}
