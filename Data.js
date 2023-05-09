const faker = require('faker');
const { v4: uuidv4 } = require('uuid');

class Data {
  constructor() {
      this.messages = [];
  }

  getMessage() {
    return {
      id: uuidv4(),
      from: faker.internet.email(),
      subject: `Hello from ${faker.name.findName()}`,
      body: `${faker.random.words(Math.floor(Math.random() * 20))}`,
      received: Date.now(),
    }
  }

  generate() {
    this.messages = [];
    const random = Math.floor(Math.random() * 5)
  
    while (this.messages.length < random) {
      this.messages.push(this.getMessage());
    }

    return {
      status: 'ok',
      timestamp: Date.now(),
      messages: this.messages,
    }
  }
}

module.exports = Data;
