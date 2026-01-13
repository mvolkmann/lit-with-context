import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { consume } from "@lit/context";
import { MyContext, myContext } from "./my-context.js";

@customElement("labeled-input")
export class LabeledInput extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    `,
  ];

  @property({ type: String }) id = "";
  @property({ type: String }) label = "";
  @property({ type: String }) name = "";

  @consume({ context: myContext, subscribe: true })
  @state()
  private context?: MyContext;

  connectedCallback() {
    super.connectedCallback();
    this.#require("id");
    this.#require("label");
  }

  handleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    // The consumer of a context cannot update its state.
    // But it can dispatch a bubbling event to request an update.
    // The lit-app component is an ancestor of this component.
    // and it is the provider of myContext.
    // The provider of a context can update it state.
    // The lit-app component listens for this event,
    // and updates the name property.
    // All consumers are then automatically updated.
    this.dispatchEvent(
      new CustomEvent("name-change", {
        bubbles: true, // default is false
        detail: input.value,
      })
    );
  }

  render() {
    return html`
      <label for="${this.id}">${this.label}</label>
      <input
        id="${this.id}"
        name="${this.name}"
        type="text"
        .value="${this.context?.name}"
        @change=${this.handleChange}
      />
    `;
  }

  #require(attrName: string) {
    if (!this.hasAttribute(attrName)) {
      console.error(`required attribute "${attrName}" is missing or empty`);
    }
  }
}
