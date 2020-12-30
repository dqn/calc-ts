# calc-ts

[![CI](https://github.com/dqn/calc-ts/workflows/CI/badge.svg)](https://github.com/dqn/calc-ts/actions)
[![npm version](https://img.shields.io/npm/v/calc-ts.svg)](https://www.npmjs.com/package/calc-ts)

Type-level calculator.

## Installation

Using npm:

```bash
$ npm install calc-ts
```

Using yarn:

```bash
$ yarn add calc-ts
```

## Example

```ts
import type { Calculate } from "calc-ts";

type Result1 = Calculate<"1 + 2">; // 3
type Result2 = Calculate<"1+2+3-4">; // 2
type Result3 = Calculate<"2 * (7 + (8))">; // 30
type Result4 = Calculate<"5 - / 9">; // never

const num1: Calculate<"1 + 4"> = 5; // OK
const num2: Calculate<"1 + 4"> = 6; // Type '6' is not assignable to type '5'.ts(2322)

type ValidExpr<S extends string> = Calculate<S> extends never ? never : S;

function safeEval<S extends string>(expr: ValidExpr<S>): Calculate<S> {
  return eval(expr);
}

const result1 = safeEval("12 + 3"); // 15
const result2 = safeEval("12 = 3"); // Argument of type 'string' is not assignable to parameter of type 'never'. ts(2345)

declare const expr: string;

const result3 = safeEval(expr); // Argument of type 'string' is not assignable to parameter of type 'never'. ts(2345)
```

## License

MIT
