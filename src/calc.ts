type MakeTupleByLength<
  Length extends number,
  Tuple extends never[] = []
> = Tuple["length"] extends Length
  ? Tuple
  : MakeTupleByLength<Length, [...Tuple, never]>;

type DecrementTupleLength<A extends any[]> = A extends [infer _, ...infer Rest]
  ? Rest
  : never;

type AddTupleLength<A extends any[], B extends any[]> = [...A, ...B]["length"];

type SubTupleLength<A extends any[], B extends any[]> = 0 extends
  | A["length"]
  | B["length"]
  ? A["length"]
  : SubTupleLength<DecrementTupleLength<A>, DecrementTupleLength<B>>;

type MulTupleLength<
  A extends any[],
  B extends any[],
  Result extends any[] = []
> = B["length"] extends 0
  ? Result["length"]
  : MulTupleLength<A, DecrementTupleLength<B>, [...Result, ...A]>;

type DivTupleLength<
  A extends any[],
  B extends any[],
  Result extends any[] = [],
  BOrig extends any[] = B
> = BOrig["length"] extends 0
  ? never
  : B["length"] extends 0
  ? DivTupleLength<A, BOrig, [...Result, never], BOrig>
  : A["length"] extends 0
  ? Result["length"]
  : DivTupleLength<
      DecrementTupleLength<A>,
      DecrementTupleLength<B>,
      Result,
      BOrig
    >;

type Add<A extends number, B extends number> = Extract<
  AddTupleLength<MakeTupleByLength<A>, MakeTupleByLength<B>>,
  number
>;

type Sub<A extends number, B extends number> = Extract<
  SubTupleLength<MakeTupleByLength<A>, MakeTupleByLength<B>>,
  number
>;

type Mul<A extends number, B extends number> = Extract<
  MulTupleLength<MakeTupleByLength<A>, MakeTupleByLength<B>>,
  number
>;

type Div<A extends number, B extends number> = Extract<
  DivTupleLength<MakeTupleByLength<A>, MakeTupleByLength<B>>,
  number
>;

type Operator = "+" | "-" | "*" | "/" | "(" | ")";

type Token = { type: Operator } | { type: "number"; value: number };

type CarryUp<N> = N extends number ? Mul<N, 10> : 0;

type NumberMap = {
  "0": 0;
  "1": 1;
  "2": 2;
  "3": 3;
  "4": 4;
  "5": 5;
  "6": 6;
  "7": 7;
  "8": 8;
  "9": 9;
};

type Tokenize<
  S extends string,
  Tokens extends Token[] = [],
  Value extends number | null = null
> = S extends `${infer C}${infer Rest}`
  ? C extends keyof NumberMap
    ? Tokenize<Rest, Tokens, Add<CarryUp<Value>, NumberMap[C]>>
    : Value extends number
    ? Tokenize<S, [...Tokens, { type: "number"; value: Value }]>
    : C extends Operator
    ? Tokenize<Rest, [...Tokens, { type: C }]>
    : C extends " "
    ? Tokenize<Rest, Tokens>
    : never
  : Value extends number
  ? [...Tokens, { type: "number"; value: Value }]
  : Tokens;

type Parse<Tokens extends Token[]> = Expr<Tokens> extends [
  infer Result,
  infer Rest
]
  ? Rest extends { length: 0 }
    ? Result
    : never
  : never;

type ASTNode =
  | { type: Exclude<Operator, "(" | ")">; lhs: ASTNode; rhs: ASTNode }
  | { type: "number"; value: number };

type ExprLoop<AST, Tokens> = Tokens extends [{ type: "+" | "-" }, ...infer Rest]
  ? Term<Rest> extends [infer Result, infer Rest]
    ? ExprLoop<{ type: Tokens[0]["type"]; lhs: AST; rhs: Result }, Rest>
    : never
  : [AST, Tokens];

type Expr<Tokens> = Term<Tokens> extends [infer Result, infer Rest]
  ? ExprLoop<Result, Rest>
  : never;

type TermLoop<AST, Tokens> = Tokens extends [{ type: "*" | "/" }, ...infer Rest]
  ? Primary<Rest> extends [infer Result, infer Rest]
    ? TermLoop<{ type: Tokens[0]["type"]; lhs: AST; rhs: Result }, Rest>
    : never
  : [AST, Tokens];

type Term<Tokens> = Primary<Tokens> extends [infer Result, infer Rest]
  ? TermLoop<Result, Rest>
  : never;

type Primary<Tokens> = Tokens extends [
  { type: "number"; value: infer Value },
  ...infer Rest
]
  ? [{ type: "number"; value: Value }, Rest]
  : Tokens extends [{ type: "(" }, ...infer Rest]
  ? Expr<Rest> extends [infer Result, [{ type: ")" }, ...infer Rest]]
    ? [Result, Rest]
    : never
  : never;

type Eval<A> = A extends { type: "number"; value: number }
  ? A["value"]
  : A extends { type: infer Type; lhs: infer LHS; rhs: infer RHS }
  ? Type extends "+"
    ? Add<Eval<LHS>, Eval<RHS>>
    : Type extends "-"
    ? Sub<Eval<LHS>, Eval<RHS>>
    : Type extends "*"
    ? Mul<Eval<LHS>, Eval<RHS>>
    : Type extends "/"
    ? Div<Eval<LHS>, Eval<RHS>>
    : never
  : never;

export type Calculate<S extends string> = Eval<Parse<Tokenize<S>>>;

type Result1 = Calculate<"1 + 2">; // 3
type Result2 = Calculate<"1+2+3-4">; // 2
type Result3 = Calculate<"2 * (7 + (8))">; // 30
type Result4 = Calculate<"5 - / 9">; // never

const num1: Calculate<"1 + 4 / (3 - 1)"> = 3; // OK
const num2: Calculate<"1 + 4 / (3 - 1)"> = 2; // Type '2' is not assignable to type '3'.ts(2322)

type ValidExpr<S extends string> = Calculate<S> extends never ? never : S;

function safeEval<S extends string>(expr: ValidExpr<S>): Calculate<S> {
  return eval(expr);
}

const result1 = safeEval("12 + 3"); // 15
const result2 = safeEval("12 = 3"); // Argument of type 'string' is not assignable to parameter of type 'never'.ts(2345)

declare const unknownString: string;

const result3 = safeEval(unknownString);
