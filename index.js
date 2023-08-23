const express = require('express')
const fileUpload = require('express-fileupload')
const path= require('path')
const cors = require('cors')
const app = express()

app.use(fileUpload())
app.use(cors())
app.use('/files', express.static(path.join(__dirname, 'files')))
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/public/index.html'))
})
app.get('/', (req, res)=> res.send('Home'))
app.post('/upload',(req,res) => {

    let EDFile = req.files.file

    EDFile.mv(`./files/${EDFile.name}`,err => {

        if(err) return res.status(500).send({ message : err })


        return res.status(200).send({ message : 'File upload' })

    })

})
app.listen(4000, ()=>console.log('Server running'))