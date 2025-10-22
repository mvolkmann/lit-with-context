import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { provide } from "@lit/context";
import { MyContext, myContext } from "./my-context.js";

export { HelloWorld } from "./hello-world.js";

@customElement("lit-app")
export class LitApp extends LitElement {
  @provide({ context: myContext })
  private context: MyContext = {
    name: "World",
    setName(name: string) {
      this.name = name;
    },
  };

  handleClick() {
    this.context = {
      name: "World",
      setName(name: string) {
        this.name = name;
      },
    };
  }

  render() {
    return html`
      <div>
        <slot></slot>
        <button @click=${this.handleClick}>Reset</button>
      </div>
    `;
  }
}
