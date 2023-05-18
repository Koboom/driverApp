const Booking = require("./booking");

class Passanger{
    constructor(name,location) {
        this.name=name;
        this.location=location;
        this.bookings=[];
    }
    book(driver,origin,destination) {
        const booking = new Booking(driver,this,origin,destination);
        this.bookings.push(booking);

        return booking;
    }
}

module.exports=Passanger;