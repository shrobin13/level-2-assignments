# TypeScript: `any` vs `unknown` — What Are You Choosing?

**Type safety is one of the biggest features TypeScript provides. But are you sure your code is actually type-safe? How do you handle variables when you don't know their type? This is where many bugs start. Let's understand why it happens and how to fix it.**

TypeScript provides two keywords for handling unpredictable data types:

- `any`
- `unknown`

Although both can store values of any type, they behave very differently.

## Why?

The reason lies underneath.

TypeScript is just a wrapper around JavaScript.
After compilation, TypeScript code becomes pure JavaScript.

That means type checking only happens during the compilation phase.

If a variable is declared as `any`, TypeScript completely disables type checking for that variable.

As a result, the code behaves like plain JavaScript.

Without proper type checking, large applications become more error-prone.

```typescript
let value: any = 'Robin is chilling!';

// TypeScript allows this
console.log(value.toFixed(2));
```

TypeScript allows this even though `toFixed()` only works on numbers.

This will crash at runtime because `value` is actually a string.

---

## What About `unknown`?

This is what helps prevent error-prone code.

Although we can assign any value to an `unknown` variable, we cannot use it directly until we determine its type.

This process is called **type narrowing**.

```typescript
let value: unknown = 'Robin is chilling!';

// Error:
// Object is of type 'unknown'
// console.log(value.toFixed(2));

if (typeof value === 'string') {
  console.log(value.toUpperCase());
}
```

Here, TypeScript forces us to check the type before performing operations.

This makes the code safer and removes many type safety issues.

---

## Conclusion

`any` removes TypeScript's safety system, while `unknown` forces developers to validate types before using them.

So whenever possible, prefer `unknown` over `any`.
