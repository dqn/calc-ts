type RecurseSub<T> = T extends { __rec: { __rec: infer U } }
  ? { __rec: RecurseSub<U> }
  : T extends { __rec: infer U }
  ? U
  : T;

type Recurse<T> = T extends { __rec: unknown } ? Recurse<RecurseSub<T>> : T;

type MakeTupleByLengthCore<
  Length,
  Tuple extends never[] = []
> = Tuple["length"] extends Length
  ? Tuple
  : { __rec: MakeTupleByLengthCore<Length, [...Tuple, never]> };

type MakeTupleByLength<Length> = Extract<
  Recurse<MakeTupleByLengthCore<Length>>,
  never[]
>;

type DecrementTupleLength<A extends never[]> = A extends [
  infer _,
  ...infer Rest
]
  ? Extract<Rest, never[]>
  : never;

type AddTupleLength<A extends never[], B extends never[]> = [
  ...A,
  ...B
]["length"];

type SubTupleLengthCore<A extends never[], B extends never[]> = 0 extends
  | A["length"]
  | B["length"]
  ? A["length"]
  : {
      __rec: SubTupleLengthCore<
        DecrementTupleLength<A>,
        DecrementTupleLength<B>
      >;
    };

type SubTupleLength<A extends never[], B extends never[]> = Recurse<
  SubTupleLengthCore<A, B>
>;

type MulTupleLengthCore<
  A extends never[],
  B extends never[],
  Result extends never[] = []
> = B["length"] extends 0
  ? Result["length"]
  : {
      __rec: MulTupleLengthCore<A, DecrementTupleLength<B>, [...Result, ...A]>;
    };

type MulTupleLength<A extends never[], B extends never[]> = Recurse<
  MulTupleLengthCore<A, B>
>;

type DivTupleLengthCore<
  A extends never[],
  B extends never[],
  Result extends never[] = [],
  BOrig extends never[] = B
> = BOrig["length"] extends 0
  ? never
  : B["length"] extends 0
  ? { __rec: DivTupleLengthCore<A, BOrig, [...Result, never], BOrig> }
  : A["length"] extends 0
  ? Result["length"]
  : {
      __rec: DivTupleLengthCore<
        DecrementTupleLength<A>,
        DecrementTupleLength<B>,
        Result,
        BOrig
      >;
    };

type DivTupleLength<A extends never[], B extends never[]> = Recurse<
  DivTupleLengthCore<A, B>
>;

type Add<A, B> = AddTupleLength<MakeTupleByLength<A>, MakeTupleByLength<B>>;

type Sub<A, B> = SubTupleLength<MakeTupleByLength<A>, MakeTupleByLength<B>>;

type Mul<A, B> = MulTupleLength<MakeTupleByLength<A>, MakeTupleByLength<B>>;

type Div<A, B> = DivTupleLength<MakeTupleByLength<A>, MakeTupleByLength<B>>;

type Operator = "+" | "-" | "*" | "/" | "(" | ")";

type CarryUp<N> = N extends number ? Mul<N, 10> : 0;

type TokenizeWithNumber<
  Rest extends string,
  Tokens extends any[],
  Value,
  Digit extends number
> = TokenizeCore<Rest, Tokens, Add<CarryUp<Value>, Digit>>;

type TokenizeWithOperator<
  Rest extends string,
  Tokens extends any[],
  Value,
  Op extends Operator
> = TokenizeCore<
  Rest,
  [
    ...Tokens,
    ...(Value extends number ? [{ type: "number"; value: Value }] : []),
    { type: Op },
  ]
>;

type TokenizeCore<
  S extends string,
  Tokens extends any[] = [],
  Value = null
> = S extends `0${infer Rest}`
  ? { __rec: TokenizeWithNumber<Rest, Tokens, Value, 0> }
  : S extends `1${infer Rest}`
  ? { __rec: TokenizeWithNumber<Rest, Tokens, Value, 1> }
  : S extends `2${infer Rest}`
  ? { __rec: TokenizeWithNumber<Rest, Tokens, Value, 2> }
  : S extends `3${infer Rest}`
  ? { __rec: TokenizeWithNumber<Rest, Tokens, Value, 3> }
  : S extends `4${infer Rest}`
  ? { __rec: TokenizeWithNumber<Rest, Tokens, Value, 4> }
  : S extends `5${infer Rest}`
  ? { __rec: TokenizeWithNumber<Rest, Tokens, Value, 5> }
  : S extends `6${infer Rest}`
  ? { __rec: TokenizeWithNumber<Rest, Tokens, Value, 6> }
  : S extends `7${infer Rest}`
  ? { __rec: TokenizeWithNumber<Rest, Tokens, Value, 7> }
  : S extends `8${infer Rest}`
  ? { __rec: TokenizeWithNumber<Rest, Tokens, Value, 8> }
  : S extends `9${infer Rest}`
  ? { __rec: TokenizeWithNumber<Rest, Tokens, Value, 9> }
  : S extends `+${infer Rest}`
  ? { __rec: TokenizeWithOperator<Rest, Tokens, Value, "+"> }
  : S extends `-${infer Rest}`
  ? { __rec: TokenizeWithOperator<Rest, Tokens, Value, "-"> }
  : S extends `*${infer Rest}`
  ? { __rec: TokenizeWithOperator<Rest, Tokens, Value, "*"> }
  : S extends `/${infer Rest}`
  ? { __rec: TokenizeWithOperator<Rest, Tokens, Value, "/"> }
  : S extends `(${infer Rest}`
  ? { __rec: TokenizeWithOperator<Rest, Tokens, Value, "("> }
  : S extends `)${infer Rest}`
  ? { __rec: TokenizeWithOperator<Rest, Tokens, Value, ")"> }
  : S extends ` ${infer Rest}`
  ? {
      __rec: TokenizeCore<
        Rest,
        [
          ...Tokens,
          ...(Value extends number ? [{ type: "number"; value: Value }] : [])
        ]
      >;
    }
  : S extends ""
  ? Value extends number
    ? [...Tokens, { type: "number"; value: Value }]
    : Tokens
  : never;

type Tokenize<S extends string> = Recurse<TokenizeCore<S>> extends infer R
  ? Extract<R, unknown[]>
  : never;

type Parse<Tokens extends unknown[]> = Expr<Tokens> extends [
  infer Result,
  infer Rest,
]
  ? Rest extends { length: 0 }
    ? Result
    : never
  : never;

type ExprLoop<AST, Tokens> = Tokens extends [{ type: "+" | "-" }, ...infer Rest]
  ? Term<Rest> extends [infer Result, infer Rest]
    ? {
        __rec: ExprLoop<
          { type: Tokens[0]["type"]; lhs: AST; rhs: Result },
          Rest
        >;
      }
    : never
  : [AST, Tokens];

type Expr<Tokens> = Term<Tokens> extends [infer Result, infer Rest]
  ? Recurse<ExprLoop<Result, Rest>>
  : never;

type TermLoop<AST, Tokens> = Tokens extends [{ type: "*" | "/" }, ...infer Rest]
  ? Primary<Rest> extends [infer Result, infer Rest]
    ? {
        __rec: TermLoop<
          { type: Tokens[0]["type"]; lhs: AST; rhs: Result },
          Rest
        >;
      }
    : never
  : [AST, Tokens];

type Term<Tokens> = Primary<Tokens> extends [infer Result, infer Rest]
  ? Recurse<TermLoop<Result, Rest>>
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
  : A extends { type: "+"; lhs: infer LHS; rhs: infer RHS }
  ? Add<Eval<LHS>, Eval<RHS>>
  : A extends { type: "-"; lhs: infer LHS; rhs: infer RHS }
  ? Sub<Eval<LHS>, Eval<RHS>>
  : A extends { type: "*"; lhs: infer LHS; rhs: infer RHS }
  ? Mul<Eval<LHS>, Eval<RHS>>
  : A extends { type: "/"; lhs: infer LHS; rhs: infer RHS }
  ? Div<Eval<LHS>, Eval<RHS>>
  : never;

export type Calculate<S extends string> = Eval<Parse<Tokenize<S>>>;
