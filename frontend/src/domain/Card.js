export class Card {
    constructor(id, value) {
      this.id = id;
      this._value = value;
    }
  
    get cardId() { return this._id; }
    get value() { return this._value; }
  
    increment() {
      this._value += 1;
    }

    toJSON() {
      return { id: this.id, value: this.value };
    }
  }