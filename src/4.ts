class Key {
  private signature: number;

  constructor() {
    this.signature = Math.random();
  }

  getSignature(): number {
    return this.signature;
  }
}

class Person {
  private key: Key;

  constructor(key: Key) {
    this.key = key;
  }

  getKey(): Key {
    return this.key;
  }
}

abstract class House {
  protected door: boolean = false;
  protected key: Key;
  protected tenants: Person[] = [];

  constructor(key: Key) {
    this.key = key;
  }

  abstract openDoor(key: Key): void;

  comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
      console.log("Person has entered the house!");
    } else {
      console.log("The door is closed! Cannot enter.");
    }
  }

  getTenants(): Person[] {
    return this.tenants;
  }
}

class MyHouse extends House {
  openDoor(key: Key): void {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
      console.log("Door opened successfully!");
    } else {
      console.log("Wrong key! Door remains closed.");
    }
  }
}

const key = new Key();
const house = new MyHouse(key);
const person = new Person(key);

house.comeIn(person);

house.openDoor(person.getKey());

house.comeIn(person);

const wrongKey = new Key();
const stranger = new Person(wrongKey);
house.openDoor(stranger.getKey());
house.comeIn(stranger);

house.openDoor(person.getKey());

house.comeIn(person);

export {};
