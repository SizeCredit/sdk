// the order is important
export enum Action {
  DEPOSIT,
  WITHDRAW,
  BUY_CREDIT_LIMIT,
  SELL_CREDIT_LIMIT,
  BUY_CREDIT_MARKET,
  SELL_CREDIT_MARKET,
  SELF_LIQUIDATE,
  COMPENSATE,
  SET_USER_CONFIGURATION,
  SET_COPY_LIMIT_ORDER_CONFIGS, // renamed in v1.8
  SET_VAULT, // added in v1.8
  MANAGE_COLLECTION_SUBSCRIPTIONS, // added in v1.8
  // add more actions here
  NUMBER_OF_ACTIONS,
}

type AvailableActions = Exclude<
  Action,
  Action.NUMBER_OF_ACTIONS | Action.MANAGE_COLLECTION_SUBSCRIPTIONS
>;

export const ActionToFunctionName: Record<AvailableActions, string> = {
  [Action.DEPOSIT]: "deposit",
  [Action.WITHDRAW]: "withdraw",
  [Action.BUY_CREDIT_LIMIT]: "buyCreditLimit",
  [Action.SELL_CREDIT_LIMIT]: "sellCreditLimit",
  [Action.BUY_CREDIT_MARKET]: "buyCreditMarket",
  [Action.SELL_CREDIT_MARKET]: "sellCreditMarket",
  [Action.SELF_LIQUIDATE]: "selfLiquidate",
  [Action.COMPENSATE]: "compensate",
  [Action.SET_USER_CONFIGURATION]: "setUserConfiguration",
  [Action.SET_COPY_LIMIT_ORDER_CONFIGS]: "setCopyLimitOrderConfigs",
  [Action.SET_VAULT]: "setVault",
};

export const FunctionNameToAction: Record<string, AvailableActions> =
  Object.fromEntries(
    Object.entries(ActionToFunctionName).map(([action, functionName]) => [
      functionName,
      Number(action),
    ]),
  ) as Record<string, AvailableActions>;

export type ActionsBitmap = bigint;

export const toBigInt = (actionsBitmap: ActionsBitmap): bigint => actionsBitmap;

export const nullActionsBitmap = (): ActionsBitmap => 0n;

export const isValid = (actionsBitmap: ActionsBitmap): boolean => {
  const maxValidBitmap = (1n << BigInt(Action.NUMBER_OF_ACTIONS)) - 1n;
  return toBigInt(actionsBitmap) <= maxValidBitmap;
};

export const isActionSet = (
  actionsBitmap: ActionsBitmap,
  action: Action,
): boolean => (toBigInt(actionsBitmap) & (1n << BigInt(action))) !== 0n;

export function getActionsBitmap(
  actionOrActions: Action | Action[],
): ActionsBitmap {
  // Check if the argument is an array
  if (Array.isArray(actionOrActions)) {
    const actions = actionOrActions;
    const combineBitmaps = (acc: bigint, action: Action): bigint =>
      acc | (1n << BigInt(action));

    return actions.reduce(combineBitmaps, 0n);
  } else {
    // Single action case
    const action = actionOrActions;
    return 1n << BigInt(action);
  }
}

export const Authorization = {
  Action,
  toBigInt,
  nullActionsBitmap,
  isValid,
  isActionSet,
  getActionsBitmap,
};

export default Authorization;
