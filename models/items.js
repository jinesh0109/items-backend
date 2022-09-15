const moment = require("moment");
const db = require("../util/database");

module.exports = class Items {
  constructor(id, name, active, date, price) {
    this.id = id;
    this.name = name;
    this.active = active;
    this.date = date;
    this.price = price;
  }

  static fetchAll() {
    return db.execute("SELECT * FROM items");
  }

  static post(item) {
    item.date = moment(item.date).format("YYYY-MM-DD HH:mm:ss");

    if (item != undefined) {
      console.log(item, "sql");
      return db.execute(
        "INSERT INTO items (name, active, date, price) VALUES (?, ?, ?, ?)",
        [item.name, item.active, item.date, item.price]
      );
    }
  }

  static update(item) {
    item.date = moment(item.date).format("YYYY-MM-DD HH:mm:ss");
    if (item != undefined) {
      return db.execute(
        "UPDATE items SET name = ?, active = ?, date = ?, price = ? WHERE id = ?",
        [item.name, item.active, item.date, item.price, item.id]
      );
    }
  }

  static delete(id) {
    return db.execute("DELETE FROM items WHERE id = ?", [id]);
  }
};
