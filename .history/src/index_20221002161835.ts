
//null以外のアサーション演算子!を使用してこれらの型を強制的に削除できる
const message: string = document.querySelector("h1")!.textContent!;

console.log(message);