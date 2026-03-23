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
