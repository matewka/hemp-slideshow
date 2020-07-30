const express = require('express')
const path = require('path')
const cors = require('cors')
const { fetchImages, getImage } = require('./fetch-usb-images-script')
const app = express()
const port = process.env.PORT || '8080'
const outDir = 'build'
const appName = 'Server'

app.use(cors())
app.use(express.static(outDir))

app.get('/api/files', async (req, res) => {
  res.send(await fetchImages())
})

app.get('/api/files/:filePath', (req, res) => {
  const image = getImage(req.params.filePath)

  if (image) {
    // TODO: fix this
    // res.sendFile(image)
    res.sendFile(decodeURIComponent(req.params.filePath))
  } else {
    res.status(404).send()
  }
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, `${outDir}/index.html`))
})

app.listen(port, () => console.log(`${appName} listening on port ${port}!`))
