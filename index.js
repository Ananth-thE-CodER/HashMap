import { HashMap } from "./hashMap.js";

const test = new HashMap();

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('moon', 'silver');

console.log(test.get('batman'));

test.set('nightingale', 'black')
test.set("quacker", "White"); // O, T is collision
test.set("zebra", "BlackWhite");
test.set("peacock", "grey") // P is collision

console.log(test.get('lion'));

test.set("peacock", "white");

console.log(test.get("peacock"));

console.log("has(): true", test.has("zebra"));
console.log("has(): false", test.has("hulk"));

console.log("keys()", test.keys());

console.log("values()", test.values());

test.remove("quacker");

console.log("keys()", test.keys());

console.log("length()", test.length());

console.log("entries()", test.entries());

test.clear();

console.log("entries()", test.entries());
