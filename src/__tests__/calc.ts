import type { Calculate } from "../calc";

type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

type Expect<T extends true> = T;

type Result1 = Calculate<"1 + 2">;
type Test1 = Expect<Equals<Result1, 3>>;

type Result2 = Calculate<"1+2+3-4">;
type Test2 = Expect<Equals<Result2, 2>>;

type Result3 = Calculate<"2 * (7 + (8))">;
type Test3 = Expect<Equals<Result3, 30>>;

type Result4 = Calculate<"5 - / 9">;
type Test4 = Expect<Equals<Result4, never>>;

type Result5 = Calculate<"1 + 2 + 3 + 4 * 5 * 6 * 7 - 8 - 9 - 64 / 2 / 2 / 2 / 2">;
type Test5 = Expect<Equals<Result5, 825>>;
