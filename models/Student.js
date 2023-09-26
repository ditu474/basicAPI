class Student {
  constructor(document, name, age, address, school) {
    this.document = document;
    this.name = name;
    this.age = age;
    this.address = address;
    this.school = school;
  }

  toString() {
    return `Document: ${this.document}, Name: ${this.name}, Age: ${this.age}, Address: ${this.address}, School: ${this.school}`;
  }
}

module.exports = Student;
