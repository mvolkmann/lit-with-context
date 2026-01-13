import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { provide } from "@lit/context";
import { MyContext, myContext } from "./my-context.js";

@customElement("lit-app")
export class LitApp extends LitElement {
  // The provider of a context can update it.
  @provide({ context: myContext })
  private context!: MyContext;

  constructor() {
    super();
    this.reset();

    // Consumers of myContext can dispatch this event to request an update.
    this.addEventListener("name-change", (event: Event) => {
      console.log("lit-app.ts: event =", event);
      this.setName((event as CustomEvent).detail);
    });
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
    // The context property must be reassigned to trigger consumer updates.
    this.context = { name };
  }
}
