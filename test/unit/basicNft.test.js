const { getNamedAccounts, deployments, ethers, network } = require('hardhat')
const { developmentChains, networkConfig } = require('../../helper-hardhat-config')
const { assert } = require('chai')

//!developmentChains.includes(network.config) ? describe.skip
//:
describe("Basic NFT unit tests", async () =>
{
    let deployer, basicNFT

    beforeEach(async () =>
    {
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        await deployments.fixture(["basicnft"])
        basicNFT = await ethers.getContract("BasicNFT")
    })

    it("allows users to mint an NFT, and updates appropriately", async () =>
    {
        const txResponse = await basicNFT.mintNFT()
        await txResponse.wait(1)

        const tokenURI = await basicNFT.tokenURI(0)
        const tokenCounter = await basicNFT.getTokenCounter()

        assert.equal(tokenCounter.toString(), "1")
        assert.equal(tokenURI, await basicNFT.TOKEN_URI())
    })
})