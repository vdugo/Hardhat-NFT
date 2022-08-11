const pinataSDK = require('@pinata/sdk')
const path = require('path')
const fs = require('fs')
require('dotenv').config()

const pinataApiKey = process.env.PINATA_API_KEY
const pinataApiSecret = process.env.PINATA_API_SECRET
const pinata = pinataSDK(pinataApiKey, pinataApiSecret)

storeImages = async (imagesFilePath) =>
{
    const fullImagesPath = path.resolve(imagesFilePath)
    const files = fs.readdirSync(fullImagesPath)

    let responses = []
    console.log('uploading to Pinata...')
    for (fileIndex in files)
    {
        console.log(`Working on ${fileIndex}...`)
        const readableStreamForFile = fs.createReadStream(`${fullImagesPath}/${files[fileIndex]}`)

        try
        {
            const response = await pinata.pinFileToIPFS(readableStreamForFile)
            responses.push(response)
        }
        catch(error)
        {
            console.log(error)
        }
    }
    
    return { responses, files }
}

storeTokenUriMetadata = async (metadata) =>
{
    try
    {
        const response = await pinata.pinJSONToIPFS(metadata)
        return response
    }
    catch (error)
    {
        console.log(error)
    }

    return null
}

module.exports = {
    storeImages,
    storeTokenUriMetadata
}