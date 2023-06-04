import { HardhatRuntimeEnvironment } from "hardhat/types";

const hiosToken = async (hre: HardhatRuntimeEnvironment) => {
    const {
        getNamedAccounts,
        deployments: { deploy, log },
    } = hre;
    const { deployer } = await getNamedAccounts();

    log("Deploying token...");
    const tokenName = "Helios";
    const tokenSymbol = "HIOS";
    const initialSupply = 500;
    const hiosToken = await deploy("HiosToken", {
        from: deployer,
        log: true,
        args: [tokenName, tokenSymbol, initialSupply],
    });
    log("Contract deployed");
};

export default hiosToken;

hiosToken.tags = ["all", "hiosToken"];
