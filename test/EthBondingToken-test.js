/* global artifacts, assert, contract, describe, it */
/* eslint-disable no-console, max-len */
/* This testing demos the buy and sell of drops according to bonding curve */
const Web3Utils = require("web3-utils");

const Token = artifacts.require("TestToken.sol");
const EthBondingToken = artifacts.require("EthBondingToken.sol");

contract("EthBondingToken", accounts => {
  const [hodler1, hodler2] = accounts;
  describe("Test User stories", () => {
    it("Should query the price of drops at different supply", async () => {
      const bonding = await EthBondingToken.new();
      await bonding.initialize(
        Web3Utils.toWei("1000"),
        150000,
        8,
        Web3Utils.toWei("20", "gwei"),
        { value: Web3Utils.toWei("0.01") }
      );

      let i;
      let supply;
      let receipt;
      const supply_range = 1;

      for (i = 0; i < 100000; i++) {
        receipt = await bonding.mint({ value: Web3Utils.toWei("0.001") });

        supply = await bonding.poolBalance();
        supply = Web3Utils.fromWei(supply.toString());

        console.log(
          `[${i}: Minting ${Web3Utils.fromWei(
            receipt.logs[1].args.amount
          )} tokens in exchange for ${Web3Utils.fromWei(
            receipt.logs[1].args.deposit
          )} eth`
        );

        if (supply > supply_range) {
          break;
        }
      }

      const bondedTokens = await bonding.balanceOf(hodler1);
      await bonding.burn(bondedTokens);
    });

    it("Should walk through typical user story", async () => {
      const bonding = await EthBondingToken.new();
      await bonding.initialize(
        Web3Utils.toWei("1000"),
        150000,
        8,
        Web3Utils.toWei("20", "gwei"),
        { value: Web3Utils.toWei("0.01") }
      );

      const bal1 = await web3.eth.getBalance(hodler1);
      console.log(`User[0] has ${Web3Utils.fromWei(bal1.toString())} eth.`);

      const ntokens = Web3Utils.toWei("0.001");
      let tx = await bonding.mint({ from: hodler1, value: ntokens });
      console.log(
        `User[0] minted ${Web3Utils.fromWei(
          tx.logs[1].args.amount
        )} tokens in exchange for ${Web3Utils.fromWei(
          tx.logs[1].args.deposit
        )} reserve tokens`
      );
      const bal2 = await web3.eth.getBalance(hodler1);
      console.log(
        `user[0] has balance of reserve tokens: ${Web3Utils.fromWei(
          bal2.valueOf()
        )}`
      );
      const bondingBalance1 = await bonding.balanceOf.call(hodler1);
      console.log(
        `User[0] should have ${Web3Utils.fromWei(
          bondingBalance1.valueOf(),
          "ether"
        )} bonded tokens now.`
      );

      tx = await bonding.mint({ from: hodler2, value: ntokens });
      console.log(
        `User[1] minted ${Web3Utils.fromWei(
          tx.logs[1].args.amount
        )} tokens in exchange for ${Web3Utils.fromWei(
          tx.logs[1].args.deposit
        )} reserve tokens`
      );
      tx = await bonding.burn(bondingBalance1, { from: hodler1 });
      console.log(
        `User[1] burnt ${Web3Utils.fromWei(
          tx.logs[1].args.amount
        )} tokens in exchange for ${Web3Utils.fromWei(
          tx.logs[1].args.reimbursement
        )} reserve tokens`
      );
      const bondingBalance2 = await bonding.balanceOf.call(hodler2);
      console.log(
        `User[1] has ${Web3Utils.fromWei(
          bondingBalance2.toString()
        )} bonded tokens now.`
      );

      tx = await bonding.burn(bondingBalance2.valueOf(), { from: hodler2 });
      console.log(
        `User[0] burnt ${Web3Utils.fromWei(
          tx.logs[1].args.amount
        )} tokens in exchange for ${Web3Utils.fromWei(
          tx.logs[1].args.reimbursement
        )} reserve tokens`
      );

      const tokenBalance1 = await web3.eth.getBalance(hodler1);
      console.log(
        `user[0] balance of tokens: ${Web3Utils.fromWei(
          tokenBalance1.toString()
        )}`
      );
    });
  });
});
