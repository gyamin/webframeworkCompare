const express = require('express')
const app = express()
const port = 3000
const _postalCode = require("./service/postal_code.js")

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/postal-code', (req, res) => {
    let start = Date.now()
    console.log("start:" + start.toString())

    const postalCode = new _postalCode()
    postalCode.selectPostalInfoByCity().then((result) => {

        let total = 0
        result.forEach((elem) => {
            total = total + parseInt(elem['postal_code'],10);
        })
        res.send({"total": total})

        let end= Date.now()
        console.log("end:" + end.toString())
        console.log("time:" + (end - start))
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
