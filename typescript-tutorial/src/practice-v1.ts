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
// 関数シグネチャとは？👉️関数の定義のうち“型の部分”がシグネチャ。引数の型・個数（必要なら順序）とか自体が関数シグネチャ。戻り値の型も関数シグネチャ。関数シグネチャに含まないものは関数の中身（処理内容）とか関数名そのものとか。
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

// OnSuccess型を作成。引数文字列、返り値なし
type OnSuccess = (message: string) => void;
// runTask関数は、引数がOnSuccess型で返り値なし、処理はOnSuccess型の関数に文字列を渡す。
function runTask(onSuccess: OnSuccess): void {
  onSuccess("準備って大切💕Preparation is important 💕");
}

// OnSuccess型の関数を作成して文字列をコンソールに表示する処理を定義
function onSuccess(message: string): void {
  console.log(message);
}
runTask(onSuccess);

// ジェネリック関数を定義してみよう！
// firstItem関数で、代入したときに配列が文字列か数値か決まる関数
function firstItem<T>(items: T[]): T | undefined {
  return items[0];
}
// 配列の要素はnumber型だから、Tはnumber、返り値はnumber | undefinedと推論される
console.log(firstItem([15, 2525, 8181]));
// 配列の要素はstring型だから、Tはstring、返り値はstring | undefinedと推論される
console.log(firstItem(["🍓", "☺️", "👶"]));

// 複数の型引数を使ってみよう♪
// pair関数の引数がkey,valueのプロパティを持つオブジェクトで型は後から決まる
// 返り値はkey,valueのオブジェクト
// TODO: { key: K; value: V }って名無し型？👉️Objectという型だと推論をしてくれる。Object型よりプロパティの値の型注釈を書くことのほうが大切。今回は省略も可能
function pair<K, V>(key: K, value: V): { key: K; value: V } {
  // ! 省略できるやつは何ていうの？👉️オブジェクトリテラルのプロパティ省略記法（shorthand）
  return { key, value };
}

// 引数2つです。pair関数がオブジェクトを作成する関数だから引数だけ渡す
const obj = pair("さつまいも🍠", 15); // Kがstring, Vがnumberと型推論される
console.log(obj);
