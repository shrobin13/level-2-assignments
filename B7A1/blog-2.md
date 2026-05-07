# How the Four Pillars of OOP Help Manage Large Scale TypeScript Applications

In case of large scale application there's not only thousands but millions of lines of code.
Managing this huge codebase becomes extremely difficult without proper architecture and best practices.

That is where **Object Oriented Programming (OOP)** plays a major role.

OOP is not just about classes and objects.
It is a programming paradigm focused on better readability and reusability.

Without proper structure, applications become difficult to scale.
In functional or unstructured codebases:

- Connecting different module becomes hard
- Duplicates code grows exponentially
- And managing codebase becomes nightmare.

TypeScript provides a strong OOP foundation which solves many of these issues.

There are four major pillars of OOP:

- Inheritance
- Polymorphism
- Abstraction
- Encapsulation

---

# 1. Inheritance

Inheritance allows a class to acquire the property and methods from it's parent class.

This reduces code duplication.

### Example

```ts
class Animal {
  move(): void {
    console.log('Moving...');
  }
}

class Dog extends Animal {
  bark(): void {
    console.log('Barking...');
  }
}

const dog = new Dog();

dog.move();
dog.bark();
```

Instead of rewriting the same logic multiple times, we reuse existing functionality.

---

# 2. Polymorphism

Polymorphism means "many forms".

A single method can behave differently depending on the object using it.

### Example

```ts
class Animal {
  sound(): void {
    console.log('Animal sound');
  }
}

class Dog extends Animal {
  sound(): void {
    console.log('Bark');
  }
}

class Cat extends Animal {
  sound(): void {
    console.log('Meow');
  }
}

const animal1 = new Dog();
const animal2 = new Cat();

animal1.sound();
animal2.sound();
```

Same method `sound()` behaves differently for different classes.

---

# 3. Abstraction

Abstraction hides unnecessary implementation details and only exposes functionality.

### Example

```ts
abstract class Payment {
  abstract pay(amount: number): void;
}

class BkashPayment extends Payment {
  pay(amount: number): void {
    console.log(`Paid ${amount} using Bkash`);
  }
}

const payment = new BkashPayment();

payment.pay(500);
```

The abstract class is consists of only the method signature.
And child classess implement those methods.

---

# 4. Encapsulation

Encapsulate data means reduce the access as per need.

### Example

```ts
class BankAccount {
  private balance: number = 0;

  deposit(amount: number): void {
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount();

account.deposit(1000);

console.log(account.getBalance());
```

Here, `balance` cannot be accessed directly because it is marked as `private`.

---

# Conclusion

TypeScript's strong OOP support helps developers build scalable, maintainable, and enterprise-level applications with better code organization and reduced complexity.
