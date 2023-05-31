import { assert, expect } from "chai";
import { ERC20 } from "../../typechain-types";

import { deployments, ethers, getNamedAccounts } from "hardhat";
import { BigNumber } from "ethers";
describe("ERC20 Token", () => {
    let hiosToken: ERC20;
    let deployer: string;
    let user1: string;
    const DECIMALS = 10 ** 18;
    const INITIAL_SUPPLY = 500;
    const TOTAL_SUPPLY = INITIAL_SUPPLY * DECIMALS;
    const tokens = ethers.utils.parseEther("10");

    beforeEach(async () => {
        const accounts = await getNamedAccounts();
        deployer = accounts.deployer;
        user1 = accounts.user1;
        await deployments.fixture(["all"]);
        hiosToken = await ethers.getContract("ERC20", deployer);
    });

    it("was deployed", () => {
        assert(hiosToken.address);
    });

    describe("Constructor", () => {
        it("sets the right total supply", async () => {
            const totalSupply = await hiosToken.totalSupply();
            assert.equal(totalSupply.toString(), TOTAL_SUPPLY.toString());
        });

        it("Initializes the token with the correct name and symbol", async () => {
            const name = await hiosToken.name();
            const symbol = await hiosToken.symbol();
            assert.equal(name, "Helios");
            assert.equal(symbol, "HIOS");
        });
    });

    describe("Transfer", () => {
        it("Should transfer tokens successfully to another address", async () => {
            await hiosToken.transfer(user1, tokens);
            expect(await hiosToken.balanceOf(user1)).to.be.equals(tokens);
        });

        it("emits the transfer event, when a transfers gets success", async () => {
            expect(await hiosToken.transfer(user1, tokens)).to.emit(hiosToken, "Transfer");
        });
    });
    describe("Allowances", () => {
        let spenderToken: ERC20;
        let tokensDelegated: BigNumber;

        beforeEach(async () => {
            spenderToken = await ethers.getContract("ERC20", user1);
            tokensDelegated = ethers.utils.parseEther("5");
        });

        it("Should approve other address to spend or transfer tokens on his befalf", async () => {
            await hiosToken.approve(user1, tokensDelegated);
            await spenderToken.transferFrom(deployer, user1, tokensDelegated);

            expect(await spenderToken.balanceOf(user1)).to.be.equal(tokensDelegated);
        });

        it("doesn't allow an unnaproved account to do transfers", async () => {
            await expect(spenderToken.transferFrom(deployer, user1, tokensDelegated)).to.be
                .reverted;
        });

        it("emits an approval event, when an approval occurs", async () => {
            expect(await hiosToken.approve(user1, tokensDelegated)).to.emit("ERC20", "Approval");
        });

        it("the allowance being set is accurate", async () => {
            await hiosToken.approve(user1, tokensDelegated);

            const allowance = await hiosToken.allowance(deployer, user1);
            assert.equal(allowance.toString(), tokensDelegated.toString());
        });

        it("Won't allow transfer over the value delegated", async () => {
            await hiosToken.approve(user1, tokensDelegated);
            await expect(spenderToken.transferFrom(deployer, user1, tokensDelegated.add("4"))).to.be
                .reverted;
        });
    });
});
