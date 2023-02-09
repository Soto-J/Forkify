// tsc --noEmit --watch
// import "./style.css";
import typescriptLogo from "../../public/typescript.svg";
import { setupCounter } from "./counter";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

// function timeout(s: number): Promise<number> {
//   return new Promise((_, reject) => {
//     setTimeout(() => {
//       reject(new Error(`Request took too long! Timeout after ${s} seconds`));
//     });
//   });
// }
setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
