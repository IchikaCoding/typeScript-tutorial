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
