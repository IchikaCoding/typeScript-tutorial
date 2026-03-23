import "./style.css";
import typescriptLogo from "./assets/typescript.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import { setupCounter } from "./counter.ts";

// ---------------2026-03-17------------
// counterBtnのボタン要素を取得する
/**
 * @type {HTMLButtonElement | null} counterBtn
 */
const counterBtn = document.querySelector<HTMLButtonElement>("#counter");
(() => {
  if (!counterBtn) return;
  setupCounter(counterBtn);
})();

const el = document.getElementById("counter");
() => {
  if (!(el instanceof HTMLButtonElement)) return;
  setupCounter(el);
};

interface Person {
  name: string;
  age: number;
  isHydrated: boolean;
}

const personOne: Person = {
  name: "ichika",
  age: 22,
  isHydrated: true,
};

console.log("personOne", personOne);

// Userの型を設定
interface User {
  name: string;
  age: number;
  hasDogs: boolean;
}
// クラスを作成
class UserAccount {
  name: string;
  age: number;
  hasDogs: boolean;
  // インスタンスが作成されたとき、最初に実行するやつなきがする。
  constructor(name: string, age: number, hasDogs: boolean) {
    // TODO: UserAccountクラスのnameはインスタンスで渡されたnameで初期化しますという意味で合っています？
    this.name = name;
    this.age = age;
    this.hasDogs = hasDogs;
  }
}
// インスタンスを作成してuserに代入
const user: User = new UserAccount("ichika", 22, false);
console.log(user);

type LockStates = "locked" | "unlocked";
const lock: LockStates = "unlocked";
if (lock === "unlocked") {
  console.log("鍵を締めてください！");
}
// 問題をとく
type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;
function pickNumber(n: PositiveOddNumbersUnderTen) {
  const message = `picked: ${n}`;
  console.log(message);
}

// windowオブジェクトにpickNumberプロパティにpickNumberメソッドを代入している
// (window as any).pickNumber = pickNumber;

pickNumber(5);

// 練習1
// const array: PositiveOddNumbersUnderTen[] = [1, 3];

// value is PositiveOddNumbersUnderTenはもしisPositiveOddNumbersUnderTen関数がtrueを返したらvalueはPositiveOddNumbersUnderTenの型ですという意味（返り値はbooleanだけどね）
// この関数の実行時だけvalueはPositiveOddNumbersUnderTen型になる
// 引数の()の横にかく型は返り値の型。
function isPositiveOddNumbersUnderTen(
  value: number,
): value is PositiveOddNumbersUnderTen {
  return (
    value === 1 || value === 3 || value === 5 || value === 7 || value === 9
  );
}
const n: number = 2;
// ここのなかでnがPositiveOddNumbersUnderTen型として使う
if (isPositiveOddNumbersUnderTen(n)) {
  console.log(`${n}は奇数です`);
}

// 練習2
// 文字列と数値の混在した配列も受け取りたいときは(string | number)[]
function wrapAnyInArray(
  obj: string | number | (string | number)[],
): (string | number)[] {
  // 文字列ならカンマでスプリットする
  if (typeof obj === "string") {
    // splitは文字列にのみ使える
    const objArray = obj.split(", ");
    return objArray;
  } else if (typeof obj === "number") {
    return [obj];
  }
  return obj;
}
const favoriteFoodArray: string[] = [
  "さつまいも🍠",
  "ミルクティー☕",
  "いちご🍓",
];
const favoriteFoodString: string = "さつまいも🍠, ミルクティー☕, いちご🍓";
const favoriteNumberArray: number[] = [18, 22, 88];
console.log(wrapAnyInArray(favoriteFoodString));
console.log(wrapAnyInArray(favoriteFoodArray));
console.log(wrapAnyInArray(favoriteNumberArray));

// 練習3
// ーー問題文ーー
// wrapInArray を使って、新しい関数 getFirstChar を作ってください。

// 引数は string | string[]
// まず wrapInArray で配列化する
// 先頭要素の「最初の1文字」を返す
// 空文字が来る可能性も考えて、戻り値の型を安全に設計すること

// ーーー私のミスーーーー
// 関数名が間違っている
// wrapInArray で配列化をしてからという文章が読めてない
// 先頭要素の最初の1文字だけを返す
// shift()で配列を破壊している
// 私の問題文の理解→wrapInArrayを実行→その返り値をgetFirstCharの引数にして最初の1文字だけを返す処理
// 返り値の型を明示する
function wrapInArray(obj: string | string[]): string[] {
  if (typeof obj === "string") {
    return [obj];
  }
  return obj;
}

// wrapInArrayをgetFirstCharの中で実行する
// getFirstChar関数自体の引数が string | string[]です
function getFirstChar(param: string | string[]): string | undefined {
  // 早期リターンはundefinedを返す。voidは返り値なしの意。
  if (param.length === 0) return;
  const convertedArray: string[] = wrapInArray(param);
  //  配列の先頭要素の最初の1文字だけを返す
  // 最初の1文字の取得方法がわからない→string[0]の形で可能！
  const firstCharOfArray: string = convertedArray[0]?.[0];
  return firstCharOfArray;
}
// string[] に修正する。
// TODO: []という型を書いたら長さ0のタプル型って言っていた。: [] は「絶対に空のまま」を表したいとき向け
const blankArray: string[] = [];
console.log(getFirstChar(favoriteFoodString));
console.log(getFirstChar(favoriteFoodArray));
console.log(getFirstChar(blankArray));
console.log(getFirstChar(""));

type NewUser = {
  id: number;
  name: string;
  isActive: boolean;
  tags: string[];
};

const newUser: NewUser = {
  id: 15,
  name: "ichigo🍓",
  isActive: false,
  tags: ["beginner", "buffet"],
};
console.log(newUser);

// Literal型は「値そのもの」を型として扱うもの
// Literal型で候補を限定するとタイプミスにもコンパイル時にエラーに気づける
type Status = "idle" | "loading" | "success" | "error";
const status: Status = "success";
const badStatus: Status = "idle";
console.log(`status: ${status}, badStatus: ${badStatus}`);

type Lesson = {
  title: string;
  difficulty: "beginner" | "intermediate"; // |はパイプ。Union型
};

function printLesson(lesson: Lesson): void {
  console.log(`${lesson.title}（${lesson.difficulty}）`);
}
// TODO: 型推論に任せる事ができますか？
const lesson: Lesson = {
  title: "いちかのお勉強会with cake🍰",
  difficulty: "intermediate",
};
// TODO: lesson: Lessonは実引数には書けないのはどうして？
printLesson(lesson);

// 2026-03-22
function printId(id: string | number): void {
  console.log(id);
}
printId("社会人1年目のいちかでーす");

function lessonType(): void {
  //  候補値を Literal型で制限する
  // ! 複雑な型は type で名前を付けて管理する
  type Difficulty = "beginner" | "intermediate" | "advanced";
  type LessonTwo = {
    title: string;
    difficulty: Difficulty;
  };

  const LessonWithIchika: LessonTwo = {
    title: "Let's study programming",
    difficulty: "beginner",
  };
  console.log(LessonWithIchika);
}
lessonType();

// 引数がstring | number
// 文字列なら大文字にして返す、数値なら小数第2位まで表示して文字列で返す
function formatValue(value: string | number): string {
  // ifの中と外でvalueの型を制限している👉️これをNarrowingという
  if (typeof value === "string") {
    // このif文の中ではvalueはstring型
    return value.toUpperCase();
  }
  // ifの外ではvalueはnumber型
  return value.toFixed(2);
}

// in でオブジェクトの形を判定する

// TODO: Bird型のflyプロパティの値は返り値のない関数型になるという意味？！
type Bird = { fly: () => void };
type Fish = { swim: () => void };

// move関数でも、プロパティキーで条件分岐をすることでNarrowingが発動
function move(animal: Bird | Fish): void {
  if ("fly" in animal) {
    animal.fly();
    return;
  }
  animal.swim();
  // TODO: returnっている？
  return;
}

// TODO: Funcじゃない！！JSのオブジェクト！
const hawkFunc: Bird = {
  fly: () => {
    console.log("パタパタ🦅");
  },
};
const penguinFunc = {
  swim: () => {
    console.log("スイスイ🐧");
  },
};
console.log(move(hawkFunc));
console.log(move(penguinFunc));

//  判別可能Union（discriminated union）を使う
type FetchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; message: string };

// FetchState型のstateが引数でstringを返すrenderMessage関数を作成
// statusに合わせてメッセージを表示する処理
function renderMessage(state: FetchState): string {
  // TODO: switchって状態とかで分岐したいときに使うくらい？他の使用例はどんな感じ？
  // status の値で型で条件分岐している👉️そこで型が確定するため、Reactの状態管理でも使いやすいパターン！
  switch (state.status) {
    case "idle":
      return "待機中です(●'◡'●)ﾆｯｺﾘ";
    case "loading":
      return "読み込み中です(❁´◡`❁)ｳﾌﾌ…";
    case "success":
      return `成功件数:${state.data.length}(*´σｰ｀)ｴﾍﾍ。`;
    case "error":
      return `エラーです(;´д｀)ﾄﾎﾎ…: ${state.message}`;
  }
}

const idleData: FetchState = { status: "idle" };
const loadingData: FetchState = { status: "loading" };
const successData: FetchState = {
  status: "success",
  data: ["さつまいも🍠", "いちご🍓", "シュークリーム（カスタード）🌕"],
};
const errorData: FetchState = {
  status: "error",
  message: "We are out of stock of cream puffs🌕.",
};

console.log(renderMessage(idleData));
console.log(renderMessage(loadingData));
console.log(renderMessage(successData));
console.log(renderMessage(errorData));

// null / undefined の判別（最重要）
// Message型としてプロパティがcontentで値が文字列なものを作成
// logMessage関数では、Message型かnull型を引数にして返り値はない
// Message型のときだけコンソールを出力

type Message = { content: string };
function logMessage(message: Message | null): void {
  // ガード節。messageがnull型のときはif文内だけで早期リターン
  // nullは実行時には値として判定。コンパイル時にはnull型として判定（Narrowing）
  if (message === null) {
    console.log("messageはnullです(;´д｀)ﾄﾎﾎ…", message);
    return;
  }
  // messageがMessage型のときはこっちが実行される
  console.log(message);
}
const messageToEveryone: Message = {
  content: "世界の美味しいものをいただきまーす٩(ˊᗜˋ*)وｴﾍ",
};
logMessage(messageToEveryone);
logMessage(null);

// -----------------2026-03-17------------
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<section id="center">
  <div class="hero">
    <img src="${heroImg}" class="base" width="170" height="179">
    <img src="${typescriptLogo}" class="framework" alt="TypeScript logo"/>
    <img src=${viteLogo} class="vite" alt="Vite logo" />
  </div>
  <div>
    <h1>Get started</h1>
    <p>Edit <code>src/main.ts</code> and save to test <code>HMR</code></p>
  </div>
  <button id="counter" type="button" class="counter"></button>
</section>

<div class="ticks"></div>

<section id="next-steps">
  <div id="docs">
    <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#documentation-icon"></use></svg>
    <h2>Documentation</h2>
    <p>Your questions, answered</p>
    <ul>
      <li>
        <a href="https://vite.dev/" target="_blank">
          <img class="logo" src=${viteLogo} alt="" />
          Explore Vite
        </a>
      </li>
      <li>
        <a href="https://www.typescriptlang.org" target="_blank">
          <img class="button-icon" src="${typescriptLogo}" alt="">
          Learn more
        </a>
      </li>
    </ul>
  </div>
  <div id="social">
    <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#social-icon"></use></svg>
    <h2>Connect with us</h2>
    <p>Join the Vite community</p>
    <ul>
      <li><a href="https://github.com/vitejs/vite" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#github-icon"></use></svg>GitHub</a></li>
      <li><a href="https://chat.vite.dev/" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#discord-icon"></use></svg>Discord</a></li>
      <li><a href="https://x.com/vite_js" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#x-icon"></use></svg>X.com</a></li>
      <li><a href="https://bsky.app/profile/vite.dev" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#bluesky-icon"></use></svg>Bluesky</a></li>
    </ul>
  </div>
</section>

<div class="ticks"></div>
<section id="spacer"></section>
`;
setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
