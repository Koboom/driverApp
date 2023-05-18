const fs = require("fs")
const flatted = require("flatted")
const { resolve } = require("path")
const { rejects } = require("assert")

class BaseDataBase {
    constructor(model) {
        this.model = model
        this.filename = model.name.toLowerCase()
    }
    save(objects) {
        return new Promise(( resolve, rejects) => {
            fs.writeFile(`${__dirname}/${this.filename}.json`, flatted.stringify(objects,null,2),(err) => {
                if(err) return rejects(err)
                resolve()
            })
        })
    }

    load() {
        return new Promise((resolve, rejects) => {
            fs.readFile(`${__dirname}/${this.filename}.json`,"utf8",(err,file) => {
                if(err) return rejects(err)
                const objects = flatted.parse(file)
                resolve(objects.map(this.model.create))
            })
        })
    }
    
    async insert(object) {
        const objects = await this.load()
        return this.save(objects.concat(object))//await yerine return yazabiliyoruz
        //çünkü halihazırda .insert önünde await le çağırdık
    }
    
    async remove(index) {
        const objects = await this.load()
        objects.splice(index,1)
    
        await this.save(objects)
    }   

    async removeBy(property, value) {        
        const objects = await this.load() //yükle
        const index = objects.findIndex(o => o[property] == value) //objenin içinden update yapmak istediğin ismin id si varsa ve eşitse bul
        if(index == -1) throw new Error(`Can not find ${this.model.name} instance with ${property} ${value}`)
        //eğer veri tabanında öyle bir kayıt bulamazsak hata dönsün çünkü splice çıkarmak içinde kullanılıyor
        objects.splice(index,1)//burada direkt objeyi siliyor.3.parametreyi vermedik silmesi için
        await this.save(objects)
    }

    async update(object) {
        const objects = await this.load() //yükle
        const index = objects.findIndex(o => o.id == object.id) //objenin içinden update yapmak istediğin ismin id si varsa ve eşitse bul
        if(index == -1) throw new Error(`Can not find ${this.model.name} instance with id ${object.id}`)
        //eğer veri tabanında öyle bir kayıt bulamazsak hata dönsün çünkü splice çıkarmak içinde kullanılıyor
        objects.splice(index, 1 , object)// ve sil ve yenisini ekle
        await this.save(objects)//kaydet
    }

    async find(id) {
        return (await this.load()).find(o=> o.id == id) //yada
        // const objects = await this.load()
        // return objects.find(o=> o.id == id)
    }

    async findBy(property, value) {
        // return this.load().find(o => o[property] == value)
        return (await this.load()).find(o => o[property]==value)
    }
    
}

module.exports = BaseDataBase
