import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { consume } from "@lit/context";
import { MyContext, myContext } from "./my-context.js";

@customElement("hello-world")
export class HelloWorld extends LitElement {
  @consume({ context: myContext, subscribe: true })
  @state()
  private context?: MyContext;

  render() {
    return html`<p>Hello, ${this.context?.name}!</p>`;
  }
}
