const router = require("express").Router()// 

router.get("/",(req, res) => {//anasayfa yada anasayfa modelleri buradan ilerliyor
    res.render("index")
})

module.exports = router

//3.35 de kaldım