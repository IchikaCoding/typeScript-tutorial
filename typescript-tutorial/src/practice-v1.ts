// interfaceで拡張してみる

function practice1(): void {
  interface Person {
    name: string;
  }
  interface PochiPochiFriends extends Person {
    message: string;
  }
  const ichika: Person = { name: "ichika" };
  const pochiKun: PochiPochiFriends = {
    name: "pochiKun",
    message: "いつもありがとう(●'◡'●)",
  };
  console.log(ichika);
  console.log(pochiKun);
}

practice1();

// TODO: typeでIntersectionを使用してみる
function practiceIntersection(): void {
  type ApiStatus = "idle" | "loading" | "success" | "error";
  type User = {
    name: string;
    price: number;
  };
  type UserWithMeta = User & { updatedAt: string };
  const satsumaimo: User = {
    name: "satsumaimo",
    price: 220,
  };
  const satsumaimoInfo: UserWithMeta = {
    name: "satsumaimo",
    price: 220,
    updatedAt: "2026-03-23",
  };
  console.log(satsumaimo);
  console.log(satsumaimoInfo);
}
practiceIntersection();

// 引数と返り値の型を明示する

function greet(name: string): string {
  return `${name}さん、よろしくね🌸`;
}
console.log(greet("さつまいも🍠"));

// suffix?: string は省略可能（オプショナル引数）（省略するとundefinedになります）
// prefix = "Hi" は未指定時に既定値が使われる（デフォルト引数）
function buildMessage(name: string, prefix = "Hi", suffix?: string): string {
  const base = `${prefix}, ${name}さん`;
  return suffix ? `${base}. ${suffix}` : base;
}

console.log(buildMessage("ichika", "konchika", "oyasumi~!!"));
// もしprefixはデフォルト、 suffixは入れたい場合、第2引数にundefinedをいれる
console.log(buildMessage("ichika", undefined, "oyasumi~!!"));

// 関数シグネチャで型を定義する練習をする
// 関数型の書き方は、(引数とその型)=>戻り値の型
type Calculator = (a: number, b: number) => number;
// aとbを掛け算する関数を作成
function multiply(a: number, b: number): number {
  return a * b;
}
// calc関数を使用してaとbの掛け算をする
// calcって何をいれるの？👉️関数の定義
function someCalc(a: number, b: number, calc: Calculator): number {
  return calc(a, b);
}

const calculatorFunc: Calculator = (a, b) => a * b;
console.log("multiply", someCalc(2, 4, multiply));
console.log("calculatorFunc", someCalc(2, 4, calculatorFunc));
