const Passenger = require("./models/passenger")
const Driver = require("./models/driver")
const passengerDataBase = require("./database/passenger-database")
const driverDataBase = require("./database/driver-database")
const printBookingHistory = require("./lib/print-booking-history")

const armagan = new Passenger(undefined,"Armagan","Kreuzberg")

const mert = new Passenger(undefined,"Mert","Berlin")
const stefan = new Driver(undefined,"Stefan","Troptower Park")

armagan.book(stefan,"Kreuzberg","Neuköln")

armagan.book(stefan,"Neuköln","Mitte")
armagan.book(stefan,"Mitte","Kreuzberg")
armagan.book(stefan,"Kreuzberg","SXF")
mert.book(stefan,"Berlin","Düsseldorf")


async function main() {    
    try {
        await passengerDataBase.save([armagan,mert])    
        await driverDataBase.save([stefan])
        const betul = Passenger.create({name:"Betul",location:"Tegel"})
        await passengerDataBase.insert(betul)
        const passengers= await passengerDataBase.load()
        passengers.forEach(printBookingHistory)
    } catch (e) {
        console.log(e)
    }
    
}
main()

