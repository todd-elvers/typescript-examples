import { Array } from "@grapheng/prelude";
import { contramap, getStructEq } from "fp-ts/lib/Eq";

console.log("Welcome to functional programming.");

////////////////////
// Eq<T> examples //
////////////////////

// 1/2 of a Comparator<T> in Java (other half is Ord<T>)
interface Eq<T> {
  readonly equals: (x: T, y: T) => boolean;
}

// Impl. for all instances of type `number`
const eqNumber: Eq<number> = {
  equals: (x: number, y: number) => x === y
};

// Method for determining whether `target` exists in `elements` based on some equality function `E`
const elem = <T>(E: Eq<T>) => (target: T, elements: T[]) =>
  elements.some(element => E.equals(element, target));

console.log(elem(eqNumber)(1, [1, 2, 3])); // true
console.log(elem(eqNumber)(4, [1, 2, 3])); // false

////////////////////////////
// Eq<T> helper functions //
////////////////////////////

interface Point {
  x: number;
  y: number;
}

// @ts-ignore
// Hand-rolled equality function for our Point type
const eqPointHandRolled: Eq<Point> = {
  equals: (p1: Point, p2: Point) =>
    p1 === p2 || (p1.x === p2.x && p1.y === p2.y)
};

// @ts-ignore
// Same as above but re-uses our equality function from before
const eqPoint: Eq<Point> = getStructEq({
  x: eqNumber,
  y: eqNumber
});

// @ts-ignore
// Same as above but operates on an Array<Point> instead
const eqArrayOfPoints: Eq<Point[]> = Array.getEq(eqPoint);

// fp-ts syntax for an interface
interface User {
  userId: number;
  name: string;
}

// .contramap() takes a function that maps A->B and an Eq<B>, then returns an Eq<A>

// Function for equality checks between User objects based on their ID equality
const eqUser: Eq<User> = contramap((user: User) => user.userId)(eqNumber);

// Returns true
console.log(
  eqUser.equals(
    { userId: 1, name: "Giulio" },
    { userId: 1, name: "Giulio Canti" }
  )
);

// Returns false
console.log(
  eqUser.equals(
    { userId: 1, name: "Giulio" },
    { userId: 2, name: "Giulio Canti" }
  )
);

/////////////////////
// Ord<T> examples //
/////////////////////

type Ordering = -1 | 0 | 1;

interface Ord<A> extends Eq<A> {
  readonly compare: (x: A, y: A) => Ordering;
}

// @ts-ignore
const ordNumber: Ord<number> = {
  equals: (x, y) => x === y,
  compare: (x, y) => (x < y ? -1 : x > y ? 1 : 0)
};

// Equivalent to Java's Math.min(x,y)
const min = <T>(O: Ord<T>) => (x: T, y: T) => (O.compare(x, y) === 1 ? y : x);

min(ordNumber)(2, 1); // 1
