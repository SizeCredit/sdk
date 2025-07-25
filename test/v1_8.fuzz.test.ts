import { JSDOM } from "jsdom";
import { describe, expect, test, beforeAll } from "@jest/globals";
import SDK from "../src";
import { ethers } from "ethers";
import {
  randomBigInt,
  randomAddress,
  randomToken,
  randomTenor,
  randomDeadline,
  randomBool,
} from "./random";

describe("@sizecredit/sdk v1.8", () => {
  let window: any;
  let sdk: SDK<"v1.8">;

  const RUNS = 32;

  beforeAll(() => {
    const html = "<!DOCTYPE html><html><body></body></html>";
    const dom = new JSDOM(html, { runScripts: "outside-only" });
    window = dom.window;
    window.ethereum = {};
  });

  test("fuzz deposit with random amounts, tokens and addresses", async () => {
    for (let i = 0; i < RUNS; i++) {
      const alice = randomAddress();
      const market1 = randomAddress();
      const amount = randomBigInt(1n, 1000000n);
      const token = randomToken();
      const to = randomAddress();
      const sizeFactory = randomAddress();

      sdk = new SDK({
        version: "v1.8",
        sizeFactory,
      });

      const txs = sdk.tx.build(alice, [
        sdk.market.deposit(market1, {
          amount,
          to,
          token,
        }),
      ]);

      expect(txs.length).toBe(1);
      expect(txs[0].target).toBe(market1);
      expect(txs[0].data).toContain(
        sdk.helpers.selector("deposit((address,uint256,address))"),
      );
    }
  });

  test("fuzz sellCreditMarket with random parameters and addresses", async () => {
    for (let i = 0; i < RUNS; i++) {
      const alice = randomAddress();
      const market1 = randomAddress();
      const amount = randomBigInt(1n, 1000000n);
      const tenor = randomTenor();
      const deadline = randomDeadline();
      const lender = randomAddress();
      const sizeFactory = randomAddress();
      const collectionId = randomBigInt(0n, 1000000n);
      const rateProvider = randomAddress();

      sdk = new SDK({
        version: "v1.8",
        sizeFactory,
      });

      const txs = sdk.tx.build(alice, [
        sdk.market.sellCreditMarket(market1, {
          lender,
          creditPositionId: ethers.constants.MaxUint256,
          amount,
          tenor,
          deadline,
          maxAPR: ethers.constants.MaxUint256,
          exactAmountIn: randomBool(),
          collectionId,
          rateProvider,
        }),
      ]);

      expect(txs.length).toBe(1);
      expect(txs[0].target).toBe(market1);
      expect(txs[0].data).toContain(
        sdk.helpers.selector(
          "sellCreditMarket((address,uint256,uint256,uint256,uint256,uint256,bool,uint256,address))",
        ),
      );
    }
  });

  test("fuzz complex operations with random parameters and addresses", async () => {
    for (let i = 0; i < RUNS; i++) {
      const alice = randomAddress();
      const market1 = randomAddress();
      const market2 = randomAddress();
      const depositAmount = randomBigInt(1n, 1000000n);
      const borrowAmount = randomBigInt(1n, 1000000n);
      const tenor = randomTenor();
      const deadline = randomDeadline();
      const lender = randomAddress();
      const token = randomToken();
      const sizeFactory = randomAddress();
      const collectionId = randomBigInt(0n, 1000000n);
      const rateProvider = randomAddress();

      sdk = new SDK({
        version: "v1.8",
        sizeFactory,
      });

      const txs = sdk.tx.build(alice, [
        sdk.market.deposit(market1, {
          amount: depositAmount,
          to: alice,
          token,
        }),
        sdk.market.sellCreditMarket(market1, {
          lender,
          creditPositionId: ethers.constants.MaxUint256,
          amount: borrowAmount,
          tenor,
          deadline,
          maxAPR: ethers.constants.MaxUint256,
          exactAmountIn: randomBool(),
          collectionId,
          rateProvider,
        }),
        sdk.market.withdraw(market1, {
          token,
          amount: ethers.constants.MaxUint256,
          to: alice,
        }),
      ]);

      expect(txs.length).toBe(1);
      expect(txs[0].data).toContain(
        sdk.helpers.selector("setAuthorization(address,uint256)"),
      );
      expect(txs[0].data).toContain(
        sdk.helpers.selector("callMarket(address,bytes)"),
      );
      expect(txs[0].data).toContain(
        sdk.helpers.selector(
          "depositOnBehalfOf(((address,uint256,address),address))",
        ),
      );
      expect(txs[0].data).toContain(
        sdk.helpers.selector(
          "withdrawOnBehalfOf(((address,uint256,address),address))",
        ),
      );
    }
  });

  test("fuzz setUserConfiguration with random parameters and addresses", async () => {
    for (let i = 0; i < RUNS; i++) {
      const alice = randomAddress();
      const market2 = randomAddress();
      const openingLimitBorrowCR = randomBigInt(0n, 1000000n);
      const allCreditPositionsForSaleDisabled = randomBool();
      const creditPositionIdsForSale = randomBool();
      const creditPositionIds: bigint[] = [];
      const sizeFactory = randomAddress();
      const vault = randomAddress();

      sdk = new SDK({
        version: "v1.8",
        sizeFactory,
      });

      const txs = sdk.tx.build(alice, [
        sdk.market.setUserConfiguration(market2, {
          openingLimitBorrowCR,
          allCreditPositionsForSaleDisabled,
          creditPositionIdsForSale,
          creditPositionIds,
        }),
      ]);

      expect(txs.length).toBe(1);
      expect(txs[0].target).toBe(market2);
      expect(txs[0].data).toContain(
        sdk.helpers.selector(
          "setUserConfiguration((uint256,bool,bool,uint256[]))",
        ),
      );
    }
  });

  test("fuzz setVault with random parameters and addresses", async () => {
    for (let i = 0; i < RUNS; i++) {
      const alice = randomAddress();
      const market2 = randomAddress();
      const sizeFactory = randomAddress();
      const vault = randomAddress();

      sdk = new SDK({
        version: "v1.8",
        sizeFactory,
      });

      const txs = sdk.tx.build(alice, [
        sdk.market.setVault(market2, {
          vault,
          forfeitOldShares: randomBool(),
        }),
      ]);

      expect(txs.length).toBe(1);
      expect(txs[0].target).toBe(market2);
      expect(txs[0].data).toContain(
        sdk.helpers.selector("setVault((address,bool))"),
      );
    }
  });
});
