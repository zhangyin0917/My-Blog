const { createCanvas } = require('canvas')
const jdenticon = require('jdenticon')

const size = 200
const value = Math.random().toString()
const canvas = createCanvas(size, size)
const ctx = canvas.getContext('2d')

const createRandomImage = () => {
  return new Promise((resolve, reject) => {
    jdenticon.drawIcon(ctx, value, size)
    const pngStream = canvas.createPNGStream()
    let data = []
    pngStream.on('data', chunk => {
      data.push(chunk)
    })
    pngStream.on('end', () => {
      let base64Image = Buffer.concat(data).toString('base64')
      resolve(base64Image)
    })
    pngStream.on('error', error => {
      reject(error)
    })
  })
}
async function fetchImageAndLog() {
  try {
    const image = await createRandomImage()
    return image
  } catch (error) {
    console.log(error)
  }
}

fetchImageAndLog()

module.exports = fetchImageAndLog
