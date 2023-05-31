import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "dotenv/config";
import "hardhat-deploy";
import "solidity-coverage";
import "hardhat-gas-reporter";

const localhostUrl = process.env.LOCALHOST_RPC_URL;
const etherscanApiKey = process.env.ETHERSCAN_API_KEY;
const coinmarketcap = process.env.COINMARKETCAP_API_KEY;

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
        },
        localhost: {
            url: localhostUrl,
            chainId: 31337,
        },
    },
    solidity: {
        compilers: [{ version: "0.8.18" }],
    },
    gasReporter: {
        enabled: false,
        coinmarketcap,
        currency: "USD",
    },
    etherscan: {
        apiKey: etherscanApiKey,
    },
    namedAccounts: {
        deployer: {
            default: 0,
            1: 0,
        },
        user1: {
            default: 1,
        },
    },
};

export default config;
