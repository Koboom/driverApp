const BaseDataBase = require("./base-database")
const Passenger = require("../models/passenger")

class PassengerDataBase extends BaseDataBase {    
    async findByName(name) {
        const objects = await this.load()        

        return objects.find(o => o.name == name)
    }
    
}

module.exports = new PassengerDataBase(Passenger)
