export class Card {
    constructor(id, value) {
      this._id = id;
      this._value = value;
    }
  
    get cardId() { return this._id; }
    get value() { return this._value; }
  
    increment() {
      this._value += 1;
    }

    toJSON() {
      return { id: this._id, value: this._value };
    }
  }