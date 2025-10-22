import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { consume } from "@lit/context";
import { MyContext, myContext } from "./my-context.js";

@customElement("hello-world")
export class HelloWorld extends LitElement {
  @consume({ context: myContext, subscribe: true })
  @property({ attribute: false })
  private context?: MyContext;

  render() {
    //TODO: Why is this.context undefined here?
    console.log("hello-world.ts render: this.context =", this.context);
    return html`<p>Hello, ${this.context?.name}!</p>`;
  }
}
