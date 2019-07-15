console.log("Welcome to TypeScript.");

//
// Creating an object, implementing it, and using it with a method
//
interface Person {
  firstName: string;
  lastName: string;
}

const bill: Person = {
  firstName: "Bill",
  lastName: "Smith"
};

const personGreeter = (person: Person): string =>
  `Hello ${person.firstName} ${person.lastName}!`;

console.log(personGreeter(bill));

//
// Extending the above example with OOP practices
//
class Student implements Person {
  public fullName: string;

  constructor(
    public firstName: string,
    public middleInitial: string,
    public lastName: string
  ) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

const studentGreeter = (student: Student): string =>
  `Hello ${student.fullName}!`;

let user = new Student("Jane", "M.", "User");

console.log(personGreeter(user)); // Student objects implement Person, so this works
console.log(studentGreeter(user));
