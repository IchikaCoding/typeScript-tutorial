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

// ジェネリック型（type）を定義する
// ApiResponse型を作成、dataプロパティの型を型変数としておく
// User型はidとnameがプロパティ

type ApiResponse<T> = {
  data: T;
  message: string;
};

type User = {
  id: number;
  name: string;
};

type Food = {
  name: string;
  rating: string;
};

// TODO: Userをどこで使用していますよってどこで伝える？
const dataInfo: ApiResponse<User> = {
  // User型を指定したからTの型がUserになる👉️dataはUser型と型推論される！
  data: { id: 15, name: "ichika-chan" },
  message: "Hello",
};

const foodInfo: ApiResponse<Food> = {
  data: { name: "いちご🍓", rating: "★★★" },
  message: "いちごっておいしい(❁´◡`❁)",
};

console.log(dataInfo);
console.log(foodInfo);

// 制約（extends）を付ける
// 制約をつけると、引数で受け取ったオブジェクトのなかでlengthプロパティだけ受け取る
function printLength<T extends { length: number }>(value: T): void {
  //   valueは他のプロパティもあるけど、制約によってlengthのみ指定可能
  console.log(value.length);
  //   console.log(value.name);
}

const funVariable = { name: "ヒール👠", length: 7, rating: "★★" };
printLength(funVariable);

// unknown は「使う前に確認する」
function countNumOfChar(value: unknown): void {
  //   このif文ではvalueはstring型にしぼり込める→プロパティアクセスやメソッド呼び出しができる
  if (typeof value === "string") {
    console.log("valueの文字数：", value.length);
  }
  //   型を絞り込んでいない→プロパティアクセスやメソッド呼び出しができません。
  //   引数を表示するだけならいける！
  console.log(value);
}

countNumOfChar("ichika");
countNumOfChar(123);

// any は最終手段としておく練習
let value: any = "konchika!";
value = [1, 2, 3];
// console.log(value.notExistingMethod());

// neverは呼び出し元に戻らず、処理が中断するときに書く
function throwError(message: string): never {
  throw new Error(message);
}

// console.log(throwError("中断します"));

// 型アサーションとas const
function defineTypes() {
  // 自分で型を言い切っているのが型アサーション
  const message = "こんちか★" as string;
  // TODO: これは新しいloading型を作成しているって理解でいいのかな？
  let status = "loading" as const;
}

(() => {
  const arr = ["a"];
  // 戻り値はarrが空配列の可能性があるためundefinedも含む
  // Tは空の配列じゃないというとこを表すことも可能！[T, ...T[]]
  function first<T>(arr: T[]): T | undefined {
    return arr[0];
  }
  // Tがstringだと型推論される
  // arrが空配列だからstringなのかnumberなのかわからない👉️arrがany[]になってしまう
  // 空配列の場合aにはundefinedが入る
  const a = first(arr);
  // 型アサーションでstringですよって伝えた👉️TSの型チェックはスキップさせる
  // 空配列なのに、strがstring型だと伝えている👉️str.toUpperCase()を実行すると中身は undefined だからクラッシュ
  // aは文字列型ですよ、そのaをstrに代入
  const str = a as string;
  console.log(a);
  console.log(str);
  // 型アサーションでTSの型チェックをスキップ👉️コンパイル時にはエラーはなし,実行時にようやくエラーになる
  // console.log(str.toUpperCase());
})();

// HTMLInputかnullを取得するmaybeInputを作成する,IDは"name"
// maybeInputがあるならコンソールに値を表示する

const maybeInput = document.getElementById("name") as HTMLInputElement | null;
if (maybeInput) {
  console.log(maybeInput.value);
}

//  as const でオブジェクトを固定する
// as const を使用してLiteral型でlessonsの型を定義
// beginnerプロパティの値は"ケーキ入門🍰"という文字列しか入らないという状態になっている？

// lessonsは変数
const lessons = {
  beginner: "ケーキ入門🍰",
  advanced: "ケーキにあうコーヒーの選び方☕",
} as const;

console.log(lessons);

// TODO: keyofはどうしてエラーになったのか調べる
// typeof lessonsはobject型だとわかる
// keyofとは？👉️オブジェクトのプロパティ名を取得できるやつ
// LessonKeyは"beginner" | "advanced"
// TODO: プロパティ名って文字列？
type LessonKey = keyof typeof lessons;

// ブラケット記法でオブジェクトのプロパティを指定できる
console.log(lessons["beginner"]);

// 引数には"beginner" | "advanced"しか入らない(文字列リテラル型のユニオン)👉️引数をミスったらすぐにわかる！
function getLesson(key: keyof typeof lessons) {
  return lessons[key];
}

console.log(getLesson("beginner")); // OK
// console.log(getLesson("middle")); // エラー

//  -----配列にも as const を使える------（配列の値からUnion型を安全に作れます。）
// levelArrayにas const つけたからLevelの要素が固定される
const levelArray = ["beginner", "intermediate", "advanced"] as const;
// levelArrayという配列から型を作成。
// typeof levelArrayでreadonly ["beginner", "intermediate", "advanced"]になる
// [0]とかなら"beginner",[number]は全部まとめた型になる。
// 👉️"beginner" | "intermediate" | "advanced"
type Level = (typeof levelArray)[number];

const levelOfIchika1: Level = "beginner";
const levelOfIchika2: Level = levelArray[2];
console.log(levelArray);
console.log(levelOfIchika1);
console.log(levelOfIchika2);

// 配列でas constの練習する関数
function printMeals(): void {
  // 型のLiteral型になる配列を作成
  const myMeals = [
    "cake🍰",
    "さつまいも🍠",
    "coffee☕",
    "クロワッサン🥐",
  ] as const;
  // 配列を利用して型を作成👉️myMealsからユニオン型を作成
  type Meal = (typeof myMeals)[number];
  // コンソールで見てみる
  const eatingNow: Meal[] = ["クロワッサン🥐", "coffee☕"];
  console.log(eatingNow);
}
printMeals();
