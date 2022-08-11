const { getNamedAccounts, deployments, ethers, network } = require('hardhat')
const { developmentChains, networkConfig } = require('../../helper-hardhat-config')
const { assert } = require('chai')

describe("Random Ipfs Nft unit tests", async () =>
{
    let deployer, randomIpfsNft

    beforeEach(async () =>
    {
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        await deployments.fixture(["randomipfs", "mocks"])
        randomIpfsNft = await ethers.getContract("RandomIpfsNft", deployer)
    })

    describe("constructor", async () =>
    {
        it("sets starting values correctly", async () =>
        {
            const dogTokenUriZero = await randomIpfsNft.getDogTokenUris(0)
            const dogTokenUriOne = await randomIpfsNft.getDogTokenUris(1)
            const dogTokenUriTwo = await randomIpfsNft.getDogTokenUris(2)

            assert.equal(dogTokenUriZero, 'ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo')
            assert.equal(dogTokenUriOne, 'ipfs://QmYQC5aGZu2PTH8XzbJrbDnvhj3gVs7ya33H9mqUNvST3d')
            assert.equal(dogTokenUriTwo, 'ipfs://QmZYmH5iDbD6v3U2ixoVAjioSzvWJszDzYdbeCLquGSpVm')
        })
    })
})