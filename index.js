const colors=require("colors");
const db = require("./database");

const Passanger = require("./passanger");
const Driver = require("./driver");

const armagan=new Passanger("Armagan","Bielefeld");
const stefan= new Driver("Stefan","Kesselbrink");

armagan.book(stefan,"Bieleleld","Köln");
armagan.book(stefan,"Köln","München");
armagan.book(stefan,"München","Bielefeld");
armagan.book(stefan,"Bielefeld","Frankfurt");

function printBooking(booking) {//yapılan bütün işleri yazdırmak istiyoruz
    console.log(`${colors.yellow(booking.passanger.name)} ${booking.origin.red} den ${colors.cyan(booking.destination)} a siparis verdi`);
}

function bookingsHistory(passanger) {//bütün yolcuları
    passanger.bookings.forEach(printBooking);//yazdır
}


db.save("passangers",[armagan]);
const passangers = db.load("passangers");

passangers.forEach(bookingsHistory);//1.44 de kaldım