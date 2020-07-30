const drivelist = require('drivelist')
const path = require('path')
const fs = require('fs')

const imageFilesRegex = /\.(jpg|jpeg|png|gif)$/

async function fetchImages() {
  const list = await drivelist.list()

  const filePaths = list
    .filter(item => item.isUSB)
    .map(item => item.mountpoints[0].path)
    .map(async mountPath => {
      return new Promise((resolve) => {
        fs.readdir(mountPath, async (err, files) => {
          if (err) {
            console.log('error', err)
            return []
          } else {
            resolve(files
              .filter(file => file.match(imageFilesRegex))
              .filter(file => file.indexOf('.') !== 0)
              .filter(file => fs.existsSync(path.join(mountPath, file)))
              .map(file => encodeURIComponent(path.join(mountPath, file))))
          }
        })
      })
    })

  return (await Promise.all(filePaths))
    .reduce((flat, arr) => ([
      ...flat,
      ...arr
    ]), [])
}

async function getImage(path) {
  const devices = await drivelist.list()

  return true
  // TODO: fix this. It should check if provided file path is really an existing file in the USB stick and return its path. Otherwise return null
  // if (devices.some(device => device.isUSB && device.mountpoints.some(mountpoint => mountpoint))) {
  //
  // }
}

module.exports = {
  fetchImages,
  getImage
}