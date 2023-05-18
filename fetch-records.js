const colors = require("colors")
const {passengerDataBase, driverDataBase} = require("./database")
const printBookingHistory = require("./lib/print-booking-history")
const Passenger = require("./models/passenger")
const Driver = require("./models/driver")

async function main() {
    
    const stefan = await driverDataBase.findBy("name","Stefan")
    const armagan = await passengerDataBase.findByName("Armagan")

    armagan.book(stefan,"Kreuzberg","Berlin")
    passengerDataBase.update(armagan)

    printBookingHistory(armagan)    
    
    console.log(await passengerDataBase.findBy("location","Berlin"))
}

main()