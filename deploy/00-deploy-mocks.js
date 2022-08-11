const { getNamedAccounts, deployments, network, ethers } = require("hardhat")
const { developmentChains } = require('../helper-hardhat-config')

const BASE_FEE = ethers.utils.parseEther("0.25") // costs 0.25 LINK per request
const GAS_PRICE_LINK = 1e9 // LINK per gas

const DECIMALS = 18
const INITIAL_PRICE = ethers.utils.parseUnits("2000", "ether")

module.exports = async({ getNamedAccounts, deployments }) =>
{
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (developmentChains.includes(network.name))
    {
        log("Local network detected, Deploying mocks...")

        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        })

        await deploy("MockV3Aggregator", {
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_PRICE]
        })
        log("Mocks deployed")
        log("------------------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]