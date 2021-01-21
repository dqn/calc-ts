# calc-ts

[![CI](https://github.com/dqn/calc-ts/workflows/CI/badge.svg)](https://github.com/dqn/calc-ts/actions)
[![npm version](https://img.shields.io/npm/v/calc-ts.svg)](https://www.npmjs.com/package/calc-ts)

Type-level calculator.

[Playground](https://www.typescriptlang.org/play?ts=4.1.2#code/PTAEAsBdIBwZwFwgOYEtLgK4CMB0BjAewFtgATARwDth8BDAG3wFpI4BYAKC8gE8YApqABKAuJgaQAjKAC8oAMKN8EupAEAeAEQyA1KABMWgHwBuUCFABmHvyGjxkg3MXLV67QBZQ+qc7BWJuaWABy2giJiEpBWLkpM7ppaABTO+lYAlKAAVNagzKAArEEWYFIADFxcwNnZXLmyjU3NLa1t7R2dXd2d9X2cuaBDwyOjY+MToACSALIACgAyAKIzSwByACoAghtTAPJr-XUDcj1n5xeX3fXAVZx8EaIqAE5wAgDKOBobxi4boAIAB7qKhkOCgADeoAA+tDngJ8AhITC4QikagqAAzATPUAAVVAAF8iVwhgB+ZGw+GIyIvN6fbAaPG-Qmk0BI-5AkFgymomkY7G4gmszjk-FsjmmO4PewIzCvTQ-P4A4ECUHgqFUtGgTBUADWVEIAHcqETQBSnvK3hpLQqGd9jL9JdK7KAZnQ9QINpgYAwBAAhXgLNXIDAKQjwjRs4NUUPgAA0bO9vqEXLVPKoAgAbjiANoAXRcBa4v3kyb9ua0ftjGC0hbT6tAMbjbIp5YEEt51KR7s97cDzbDEc0g4ToFzuEn7fjoEzOee+ZZUu491dva9Pr9A5DGA0o9LoCWwOedHwkCjotpVs06-7QZ34HDkf3xkTl7nefzJeX4SEABEEXhYg1UgdtRw0LYVW5cEP2eAsD0ghseVzNkBRxGE3yGSdcDQ3EHEgLgv0vCkj0gE8zxtMRIBnWD4M7WCf1XCItjIMgwIfCCoPTGDs0-Gd-S4xtaMXIs2WwrZMNAbD-UIytqzjOtGJlUAGXYmtH2HTikJ4+cC34wSM14uCRPkcoDI4S8AB9QC2OSHzrNlrP9Oz1Ic4ibJchSiKGJEITZEYtRpVTNwEUcn00fzRgA-AgJAtS4wg19IpGaLYqoUCQvA-1jGS0AzEiwklNdYKU3AxDVSEoy9NAATtNnKqTKvBULyGEq-TCzSJJqnLOHyldlJmCR4qHSM2XK6D6t0-NJNqirDKmySHGiczJs-IsiIPZyq3s+s5vBSp3KWyRPNrbz2UhXLAp7IbMofcKIJnVKBGA9LhvADRspnCdJyO6ipMnLZF2XEZCpdCJBoYN6tL21bjP0urhIPW1rTZCG3vurrsu-MH-1QLN0c0saVuEmbiYaxaokkMmpvWma9meVBkGptb5Bk3qXH9enGZO8A6xWg6xVgzstvk07+dbLttT-PGCcjTGueQL7sN+mijOmmqFZZTtbO21zdomgXzUiRxIB5tyfIuy8Ar5JFpfx271Pu3Khiel6MtKjitiSq2osA564odhLPud43okksZOYZ5Bcr6kGioiO2ofG7jYeq2aJsRlxkYiy9E8DkbNExnq+t-GzWIe7qXBYtj8-e28Qu3dTEpneuU0boPHXjoR7SLlw2tCjjW63e8m69luPQ3NuR47kumKECGK+ylw0drjQh4DafdzHt0J7vLLO5x0A7cXg8849pv1-brfXx3vsG8397stn5S9kEE9IAjFwtF0LRQGsrRmC-3-tkIBoAtDAFASkSBGQtBd1cM8Z4vA8QwA0GsA8axiaYGINgdCFIF5rBnBUJ0oByhwI2IQT0VBUAAC8BAAHV0DgDWFgnBzwWrG0gCtOAZEMSKyTBQtU4I6p0CoLwPSbIABqjBMACEktLNAnCEYsJxCWP4AiqG0PuvhGc5DKFwBnNXDQSgEFIJQVIhgMib7yPQAffqrpdFqhofQxhr8cRqAjOw-CXCeGxkkg4qgQiYYiLEdNSR0jZFslfitVx78IyqLLOopxTtLzaLZChH22F-H6MithZI5iZGYOwbg8cUIZRIi0FQZRzxYGgCzOEpE+ShCEkLEiAsGRw7IjKaAKJIohgbTIYkzRhNLzvG8QzXx-C9ErWCQWWmYSLFCHkJUhgDB4kqRWgAA3KAAEghLhDhhINkS01DbUA-inEMIwMwopbDtFnPUfo0AjSZzlC1peJEoy6obKkLs-Z+FDnHJRN2e5lCLmMOuawyi3CdEPJnM80AUg3kW0+TDDZBhflYnQv8o57kTnAvObQy5TCqlQr+lkuF4SZwGCRedFFE0NlWAxYKA5OKxR4u1AS5xVySV3PJU8yl1gaUfM2Z4JlWKqIAtxUCjlgyuXEpuaSmFeiKULJnJ4IV6yvmFDFXhCVrKjbsppJyolEKcSKpBYIlVMiZyFA1XSlOGyABsOqWWAquhajRcrTW3Kokqy1-LVWgEdXazZAB2F12K3WnONeCnlvqPWPPhaGkNXyQgRr1VG-FsqTVxuhQmq1sjQAhBTaigAnOm7hkq2XSqNdm2NCreWwoDda0ApaS30t0BWyAVaDU1o5HWjAMT3E+rzXy+F38TAkneZq1FzAu09opIa-toLCUuLfsO81Y6BUAMnb02lmzsjzv1YuvtHqwWDvXR-EdZKm3jpAe2h1wAj2ZplSuuVQ6r2btvduiBD7GwbOSM+qV7qY0XrcZ+xtyrm2FqgX+nkGyMhAerSBgd4AP0eMg-68dMC4Pgg2aAJDBrLrRtlckiYqSfYjHSZMf6uByUhywpOPJ4TCmsKNrmUpdhymVJuTUupCyGkseaedNpIczojFjsMPdwq6paC0BLRprGVE+wpN9OjTbOOCG41Uvj9ToNEnE+dLJ9EjIDLfRoe1jZuHjOQEjOUzVOX3XeI6FafyJakXIueYQM5dQGmNFQOi06GKHzmHQBzDzmbGQPEeGAbCsm-DqtR0AfzKbUVQpi3V3DCISy8XVKEotwBIjMnusUv1IpIiFkF0zh8YvPAWIQQgKCtjvA2H6gJB4skrQ46ALpE6-5gMAUSGc2EUvcLOm2HExBSUJZhrmUbYdksZY4YZxdId3W1fq419hExNMCGXYI3M5R8yVhlIpUADBwCIBsi18wzxLtIl+kNhjHCQ6SZBuV2GnZczNdawm-McDavfAeR1ybQO9EzYmnNpbKtFvMvwuNpq1oNsNZQTD-CjoTPzjIZNzbTWWttbgB1iLiXdvlJAf18Bv9CTDcnKNyACO5gM2IGF3g02uvzckDOOnK3LYTBAzjlH23xik4TYd47WhTv-fO-d67Gxbsy8e9T57+FXvA1GCV86lWLbffx397HzwpvxZcIz1AzPEFg8ERDlOUO4epa59DqiCPs7fAF1ttHVEMdVaxyFpnLOLftbUVMxLbIRcVJ0+YfjMj0RLcU0ry8I2HdZc4Aj7rvWeOsN0wJ-T1Pludk6yTnrXGwHJCpzTnCif6fucBLFtniWOd-VT0XrQMChu0e5zz3M7uxsfa15r6rdiIhLH44lKuK1Q-p5xJnqPs4qlTrFDrSPAhzbnWTo2UPP9zAXau-shYAAJd48vt-Q-33Po2hih+MD3Pvm+F+GA2mvz1C2q+eSh8AZvmXO-9+H+j3Dk-e6KT2i35X7OYzhAHCAP7axj6F5aZgIgLv5H7Mp74H6gB3YIFYp-4SwLxAFIE37D7gHOaP4r5QG9YQLwE-7oRIHf6w7oGjL-5Hx4waDYHX6gF4EQFe44hwLxAqAMBqCaCWY8jWa8LRbD6hbhbmYEF9RAA)

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
