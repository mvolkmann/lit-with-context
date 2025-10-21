import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { consume } from "@lit/context";
import { MyContext, myContext } from "./my-context.js";

@customElement("hello-world")
export class HelloWorld extends LitElement {
  @consume({ context: myContext })
  @property({ attribute: false })
  public context?: MyContext; //TODO: Why public?

  render() {
    console.log("hello-world.ts render: this.context =", this.context);
    return html`<p>Hello, ${this.context?.name}!</p>`;
  }
}
