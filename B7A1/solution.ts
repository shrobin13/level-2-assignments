//Problem 1 solution
const filterEvenNumbers = (numbers: number[]): number[] => numbers.filter((n) => (n & 1) === 0);


//Problem 2 solution
const reverseString = (inputString: string): string => {
  let result = '';
  for (let i = 0; i < inputString.length; i++) {
    result += inputString[inputString.length - i - 1];
  }

  return result;
};


//Problem 3 solution
type StringOrNumber = string | number;
const checkType = (inputValue: StringOrNumber): string => {
  if (typeof inputValue === 'string') return 'String';

  return 'Number';
};


//Problem 4 solution
const getProperty = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];


// Problem 5 solution
interface Book {
  title: string;
  author: string;
  publishedYear: number;
}

interface BookReaded extends Book {
  isRead: boolean;
}

const toggleReadStatus = (book: Book): BookReaded => {
  return { ...book, isRead: true };
}


//Problem 6 solution
class Person {
  constructor(public name: string, public age: number) { }
}

class Student extends Person {
  constructor(name: string, age: number, public grade: string) {
    super(name, age);
  }

  getDetails(): string {
    return `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
  }
}


//Problem 7 solution
const getIntersection = (numbers1: number[], numbers2: number[]): number[] => {

  numbers1.sort((a, b) => a - b);
  numbers2.sort((a, b) => a - b);

  let intersectedResult: number[] = [];
  let i = 0, j = 0;

  while (i < numbers1.length && j < numbers2.length) {
    if (numbers1[i] === numbers2[j]) {
      intersectedResult.push(numbers1[i]);
      i++; j++;
    }

    else if (numbers1[i] < numbers2[j]) { i++; }
    else j++;
  }

  return intersectedResult;
}



