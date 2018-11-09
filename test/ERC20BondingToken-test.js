/* global artifacts, assert, contract, describe, it */
/* eslint-disable no-console, max-len */
/* This testing demos the buy and sell of drops according to bonding curve */
const Web3Utils = require("web3-utils");

const Token = artifacts.require("TestToken.sol");
const ERC20BondingToken = artifacts.require("ERC20BondingToken.sol");

contract("ERC20BondingToken", accounts => {
  const [hodler1, hodler2] = accounts;
  describe("Test User stories", () => {
    it("Should query the price of drops at different supply", async () => {
      const token = await Token.new();
      await token.initialize(
        "test",
        "tst",
        18,
        Web3Utils.toWei("1000000000"),
        hodler1,
        [],
        []
      );
      const bonding = await ERC20BondingToken.new();
      await token.approve(bonding.address, Web3Utils.toWei("1000000000"));
      await bonding.initialize(
        token.address,
        Web3Utils.toWei("1"),
        Web3Utils.toWei("1000000"),
        150000,
        8,
        Web3Utils.toWei("20", "gwei")
      );

      let i;
      let supply;
      let receipt;
      const supply_range = 10000;
      for (i = 0; i < 100000; i++) {
        receipt = await bonding.mint(Web3Utils.toWei("500"));
        supply = await bonding.poolBalance();
        supply = Web3Utils.fromWei(supply.toString());

        console.log(
          `[${i}: Minting ${Web3Utils.fromWei(
            receipt.logs[2].args.amount
          )} tokens in exchange for ${Web3Utils.fromWei(
            receipt.logs[2].args.deposit
          )} reserve tokens`
        );

        if (supply > supply_range) {
          break;
        }
      }

      const bondedTokens = await bonding.balanceOf(hodler1);
      await bonding.burn(bondedTokens);
    });

    it("Should walk through typical user story", async () => {
      const token = await Token.deployed();
      await token.initialize(
        "test",
        "tst",
        18,
        Web3Utils.toWei("1000000000"),
        hodler1,
        [],
        []
      );

      await token.transfer(hodler2, Web3Utils.toWei("500000000"));

      const bonding = await ERC20BondingToken.deployed();

      await token.approve(bonding.address, Web3Utils.toWei("1000000000"));
      await token.approve(bonding.address, Web3Utils.toWei("1000000000"), {
        from: hodler2
      });
      await bonding.initialize(
        token.address,
        Web3Utils.toWei("1"),
        Web3Utils.toWei("1000000"),
        150000,
        8,
        Web3Utils.toWei("20", "gwei")
      );

      const bal1 = await token.balanceOf.call(hodler1);
      console.log(
        `User has ${Web3Utils.fromWei(bal1.toString())} reserve tokens.`
      );

      const ntokens = Web3Utils.toWei("10");
      let tx = await bonding.mint(ntokens, { from: hodler1 });

      console.log(
        `User[0] minted ${Web3Utils.fromWei(
          tx.logs[2].args.amount
        )} tokens in exchange for ${Web3Utils.fromWei(
          tx.logs[2].args.deposit
        )} reserve tokens`
      );
      const bal2 = await token.balanceOf.call(hodler1);
      console.log(
        `user[0] has balance of reserve tokens: ${Web3Utils.fromWei(
          bal2.valueOf()
        )}`
      );
      const bondingBalance1 = await bonding.balanceOf.call(hodler1);
      console.log(
        `User [0] should have ${Web3Utils.fromWei(
          bondingBalance1.valueOf(),
          "ether"
        )} bonded tokens now.`
      );

      tx = await bonding.mint(ntokens, { from: hodler2 });
      console.log(
        `User[1] minted ${Web3Utils.fromWei(
          tx.logs[2].args.amount
        )} tokens in exchange for ${Web3Utils.fromWei(
          tx.logs[2].args.deposit
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

      const tokenBalance1 = await token.balanceOf.call(hodler1);
      console.log(
        `user[0] balance of tokens: ${Web3Utils.fromWei(
          tokenBalance1.toString()
        )}`
      );
    });
  });
});
