const Booking = require("./booking")
const uuid = require("uuid")

class Passenger{//id olsun ama yoksa uuid olsun
    constructor(id=uuid.v4(), name, location, bookings = []) {
        //default bookings array olsun ama bookings eklenebilsin
        this.id=id
        this.name=name;
        this.location=location;
        this.bookings = bookings//*
    }
    book(driver,origin,destination) {
        const booking = new Booking(driver,this,origin,destination);
        this.bookings.push(booking);

        return booking
    }
    //amacım hala armagan.book un çalışması. artık obje olduğu için çalışmıyordu
    static create({id,name, location, bookings }) {//Passanger objesinin modelini yaratıyoruz
        return new Passenger(id,name,location,bookings)//* olanlar aynı kodu işaret ediyor
    }
}

module.exports = Passenger
