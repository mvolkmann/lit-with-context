import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { provide } from "@lit/context";
import { MyContext, myContext } from "./my-context.js";

@customElement("lit-app")
export class LitApp extends LitElement {
  @provide({ context: myContext })
  private context!: MyContext;

  constructor() {
    super();
    this.setName("Test");
  }

  render() {
    return html`
      <div>
        <slot></slot>
        <button @click=${this.reset}>Reset</button>
      </div>
    `;
  }

  reset() {
    this.setName("World");
  }

  private setName(name: string) {
    console.log("lit-app.ts setName: name =", name);
    this.context = {
      name,
      //setName: this.setName.bind(this),
      setName(name: string) {
        this.name = name;
      },
    };
  }
}
