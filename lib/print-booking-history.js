const colors = require("colors")
function printBooking(booking) {
    console.log(`${colors.yellow(booking.passenger.name)} möchte mit ${colors.red(booking.driver.name)} von ${colors.blue(booking.origin)} nach ${colors.yellow(booking.destination)} fahren`)    
}

function printBookingHistory(passenger) {
    if(passenger.bookings.length == 0 ){
        return console.log(`${passenger.name} henüz siparis vermedi`)    
    }       
    passenger.bookings.forEach(printBooking)
}

module.exports = printBookingHistory