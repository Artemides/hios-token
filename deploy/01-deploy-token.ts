import { HardhatRuntimeEnvironment } from "hardhat/types";

const hiosToken = async (hre: HardhatRuntimeEnvironment) => {
    const {
        getNamedAccounts,
        deployments: { deploy, log },
    } = hre;
    const { deployer } = await getNamedAccounts();

    const tokenName = "Helios";
    const tokenSymbol = "HIOS";
    const initialSupply = 500;
    const hiosToken = await deploy("HiosToken", {
        from: deployer,
        log: true,
        args: [tokenName, tokenSymbol, initialSupply],
    });

};

export default hiosToken;

hiosToken.tags = ["all", "hiosToken"];
