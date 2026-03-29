// APIのデータを安全に扱ってみよう！

// 受け取り時は unknown
type User = {
  id: number;
  name: string;
};

// もしfetchRawの値を取得したいなら、awaitしてPromiseチケットと交換する
async function fetchRaw(): Promise<unknown> {
  // responseはResponseオブジェクト。
  const response: Response = await fetch("api/user");
  // json()でResponseオブジェクトをJSONとして読み取って、JSの値として返す。
  // unknown型を返す。検証する前はunknown型としておく
  return response.json();
}

// 型ガードを作る
// 引数valueはunknown型、戻り値がtrueならvalueがUser型ですよって意味（大きく言うとboolean型）
function isUser(value: unknown): value is User {
  // valueがオブジェクトじゃない、もしくはnullだった場合はfalse
  if (typeof value !== "object" || value === null) return false;
  //   オブジェクト、もしくはnullじゃないときに実行する処理
  //   value は最初 unknown なので、そのままでは value.id のように触れない
  //   as演算子を使用してvalueをRecordでオブジェクトのプロパティのキーがstring型、値がunknown型としている
  // 　いったんプロパティキーで値にアクセスできるようにTSに伝えて、maybeUserに代入
  //   →まだ安全が保証されたわけではない
  const maybeUser = value as Record<string, unknown>;
  //   ここで実際の値の型を検証して、安全に扱えるようにしている
  //   idが数値型、nameが文字列型が両方trueだったらtrueを返す
  return typeof maybeUser.id === "number" && typeof maybeUser.name === "string";
}

// TODO: fetchUserはどうしてPromiseを返すの？
// async関数は必ずPromiseを返すから。非同期処理なのでチケット発行してその場で値を返すことをしない処理だから
// fetchUser()を実行するときはawaitしないといけないってこと
async function fetchUser(): Promise<User> {
  //   fetchRaw()をawaitすることで、APIのデータをjsの値として取得可能
  const raw = await fetchRaw();
  //   NarrowingしてrawデータがUser型と一致しているかどうかをチェック
  //   User型じゃないならエラーを投げる
  if (!isUser(raw)) {
    throw new Error("The user data format is invalid.");
  }
  //   User型ならrawを返す
  return raw;
}

// 配列レスポンスの検証例

// isUserArrayの引数はunknown型。（理想は配列が入っていること）
// isUser には、その配列の各要素が1つずつ渡される。一つずつの要素は理想ならオブジェクトが入る
function isUserArray(value: unknown): value is User[] {
  // valueが配列、かつ全要素が isUser を満たすなら、
  // valueはUser型の配列で確定できる
  return Array.isArray(value) && value.every(isUser);
}
