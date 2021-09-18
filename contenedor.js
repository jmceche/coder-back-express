const fs = require('fs');

class Contenedor {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async save(obj) {
    const items = await this.getAll();
    try {
      const newObj = { ...obj, id: items.length + 1 };
      items.push(newObj)
      await fs.promises.writeFile(this.fileName, JSON.stringify(items,null,2))
      return newObj['id']
    } catch (error) {
      throw "Error al guardar objeto: " + error;
    }
  }

  async getById(id) {
    const items = await this.getAll();
    const item = items.find(item => item.id === id);
    return item ?? null;
  }

  async getAll() {
    try {
      const items = await fs.promises.readFile(this.fileName)
      return items.length ? JSON.parse(items) : []
    } catch (error) {
      throw "Error al leer datos: " + error;
    }
  }

  async deleteById(id) {
    try {
      const items = await this.getAll()
      const newObj = items.filter(obj => obj.id !== id);
      await fs.promises.writeFile(this.fileName,JSON.stringify(newObj, null, 2),'utf-8')
    } catch (error) {
      throw "Error al borrar objeto: " + error;
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.fileName,JSON.stringify([]),'utf-8')
    } catch (error) {
      throw "Error al borrar datos: " + error;
    }
  }
}

module.exports = Contenedor;