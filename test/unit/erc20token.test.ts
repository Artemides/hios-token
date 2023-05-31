import { assert } from "chai";
import { ERC20 } from "../../typechain-types";

import { deployments, ethers, getNamedAccounts } from "hardhat";
describe("ERC20 Token", () => {
    let hiosToken: ERC20;
    let deployer: string;
    const DECIMALS = 10 ** 18;
    const INITIAL_SUPPLY = 500;
    const TOTAL_SUPPLY = INITIAL_SUPPLY * DECIMALS;

    beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer;
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
});
