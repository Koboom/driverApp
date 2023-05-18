const BaseDataBase = require("./base-database")
const Driver = require("../models/driver")

class DriverDataBase extends BaseDataBase {
     findByDriverName(name) {
        return this.findBy("name",name)
    }
    findByLocation(location) {
        return this.findBy("location",location)
    }
    
}

module.exports = new DriverDataBase(Driver)