import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { consume } from "@lit/context";
import { MyContext, myContext } from "./my-context.js";

@customElement("labeled-input")
export class LabeledInput extends LitElement {
  static styles = [
    css`
      div {
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
    this.dispatchEvent(
      new CustomEvent("name-change", {
        bubbles: true,
        composed: true,
        detail: input.value,
      })
    );
  }

  render() {
    return html`
      <div>
        <label for="${this.id}">${this.label}</label>
        <input
          id="${this.id}"
          name="${this.name}"
          type="text"
          value="${this.context?.name}"
          @change=${this.handleChange}
        />
      </div>
    `;
  }

  #require(attrName: string) {
    if (!this.hasAttribute(attrName)) {
      console.error(`required attribute "${attrName}" is missing or empty`);
    }
  }
}
