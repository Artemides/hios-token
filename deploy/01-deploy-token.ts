import { HardhatRuntimeEnvironment } from "hardhat/types";

const hiosToken = async (hre: HardhatRuntimeEnvironment) => {
    const {
        getNamedAccounts,
        deployments: { deploy, log },
    } = hre;
    const { deployer } = await getNamedAccounts();
    const args = [];

    log("Deploying token...");
    const tokenName = "Helios";
    const tokenSymbol = "HIOS";
    const hiosToken = await deploy("Erc20Token", {
        from: deployer,
        log: true,
        args: [tokenName, tokenSymbol],
    });
};

export default hiosToken;

hiosToken.tags = ["all", "hiosToken"];
