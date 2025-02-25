import fs from "fs/promises";

class FileManager {
  constructor(filename) {
    this.path = `./data/${filename}.json`;
  }

  async read() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async write(data) {
    await fs.writeFile(this.path, JSON.stringify(data, null, 2));
  }

  async getAll() {
    return await this.read();
  }

  async getById(id) {
    const data = await this.read();
    return data.find((item) => item.id === id) || null;
  }

  async save(item) {
    const data = await this.read();
    item.id = data.length ? data[data.length - 1].id + 1 : 1;
    data.push(item);
    await this.write(data);
    return item;
  }

  async deleteById(id) {
    let data = await this.read();
    data = data.filter((item) => item.id !== id);
    await this.write(data);
  }
}

export const productFileManager = new FileManager("products");
export const cartFileManager = new FileManager("carts");
