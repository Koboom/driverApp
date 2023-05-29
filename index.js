const express = require("express")
const bodyParser = require('body-parser') // create yapabilmek için , insert yapabilmek için
const passengersRouter =require("./routes/passengers")// yeni açtığımız js si buraya tanımlıyoruz
const indexRouter = require("./routes/index")
require("./mongo-connection")

const app = express()
app.use(bodyParser.json())//kullanılan dosya json olmalı

app.set("view engine","pug")//pug dan bütün bilgileri alıyoruz
app.use("/passengers",passengersRouter)// passengers ile başlayan bütün routes lar PassengersRouter içine gitsin ve kullan(* olanlara bak)
//* yazan yere not: yukarıdaki kod passengers lerin hepsini kaldırabildiğimiz anlamın geliyor.
//Not: yeni versiyon çıkardığımız zaman /passengers-V2 diyebiliriz ve diger sayfadaki bütün bilgileri değiştirmeye gerek kalmıyor.
app.use("/",indexRouter)

app.listen(3000, () => {// okunacak localhost sayfası
    console.log("started listening on 3000")
})
// index.js i passengers olarak routes dosyası altına kaydettik