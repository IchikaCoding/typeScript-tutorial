// elementが引数。button要素が入る。
export function setupCounter(element: HTMLButtonElement) {
  // 型が推論できる場合は堅注釈は不要
  let counter = 0;
  // コールバックではなくてただの関数の定義
  // countという数値型の引数。
  // ②
  const setCounter = (count: number) => {
    counter = count;
    element.innerHTML = `Count is ${counter}`;
  };
  // ボタン要素にイベントリスナーを登録。
  // クリックしたときにsetCounterで+ 1される（後で実行される関数だからコールバック）
  // ③
  element.addEventListener("click", () => setCounter(counter + 1));
  // ①
  setCounter(0);
}
