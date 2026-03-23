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
