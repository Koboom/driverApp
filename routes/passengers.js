//buradaki bütün bilgileri index.js(route dışından) buraya getirdik. rahatlatmak için
const { passengerDataBase, driverDataBase } = require("../database")//. koyduk bir üst dosya oluyor otomatik
const flatted = require("flatted")//json flatten şeklinde olduğu için çağırıyoruz

const router = require("express").Router()// app dediğimiz yerleri router ile değiştiriyoruz yoksa çalışmıyor

// * passengers kelimelerin hepsini kaldırdık. nedeni index.js de açıkladım
// bunu yerine yeni bir API çıkarabiliriz passengers yerine passengers2 gelirse yeniden kod yazmaya lüzum kalmaz. bunuda indexjs 
// içinde açıklıyorum
  router.get("/",async (req,res) => {//passengers sayfasının içine bütün bilgileri çağırıyoruz *
    const passengers = await passengerDataBase.load()
    // res.send(flatted.stringify(passengers))
    res.render("passengers", {passengers})
})

  router.post("/",async (req,res) =>{//passenger içine ekleme yapabilmek için önce yaratıyoruz ve ekliyoruz *
    const passenger = Passenger.create(req.body)//bunun için bodyParser gerekiyor
    await passengerDataBase.insert(passenger) 
    
    res.send(passenger)
})

  router.delete("/:passengersId", async(req,res) => {//*
    await passengerDataBase.removeBy("id", req.params.passengersId) //çağırma ile aynı yöntemi uyguluyoruz

    res.send("ok")
})

  router.get("/:passengerId",async (req,res) => {//id ile çağırıyoruz *
    const passenger = await passengerDataBase.find(req.params.passengerId)//bu özel format ezberlemek lazıSm
    if(!passenger) return res.status("404").send("Cannot find id")//
    res.render("passenger",{passenger})
})
// /passengers/:passengerId/bookings sıralamasını axios da da yapıyoruz. yeni book eklemek için kullanıyoruz *
  router.post("/:passengerId/bookings",async (req, res) => {
    const {driverId, origin, destination} = req.body//daha temiz kod için
    const {passengerId} =req.params//daha temiz kod için 

    const passenger = await passengerDataBase.find(passengerId)//yolcuyu bul. yada req.params.passengerId yazılabilir
    const driver = await driverDataBase.find(driverId)//söforü bul

    //ünite4notlar a bak
    passenger.book(driver, origin, destination)
    await passengerDataBase.update(passenger)//güncelle
    // res.send(flatted.stringify(passenger))//yazdir ama bu 
    res.send("ok")
})

module.exports = router