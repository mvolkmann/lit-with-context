import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { provide } from "@lit/context";
import { MyContext, myContext } from "./my-context.js";

export { HelloWorld } from "./hello-world.js";

@customElement("lit-app")
export class LitApp extends LitElement {
  @provide({ context: myContext })
  @property({ attribute: false })
  public context: MyContext = {
    //TODO: Why public?
    name: "World",
    setName(name: string) {
      this.name = name;
    },
  };

  render() {
    return html`
      <div>
        <slot></slot>
        <button @click="this.context.setName('World')">Reset</button>
      </div>
    `;
  }
}
