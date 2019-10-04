import tippy from "https://cdn.pika.dev/tippy.js/v5";
import { LitElement, html, css, unsafeCSS } from "https://cdn.pika.dev/lit-element/v2";
import icons from "./icons.js";

const tippyCss = document.createElement("link");
tippyCss.rel = "stylesheet";
tippyCss.href = "https://unpkg.com/tippy.js@5.0.1/dist/tippy.css";
document.head.appendChild(tippyCss);

const tooltips = {
    "failed": "Feature detection failed",
    "in-progress": "Feature detection in progress",
    "supported": "Feature supported",
    "not-supported": "Feature not supported"
};

class WasmFeature extends LitElement {
    static get styles() {
        return css`
            :host {
                width: 100%;
                background: #FFF;
            }
            
            :host(:nth-child(even)) {
                background: #F7F7F7 !important;
            }
            
            .wasm-feature {
                padding: 10px 20px;
                position: relative;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                flex: 0 0 auto;
                font-family: sans-serif;
                white-space: nowrap;
            }
            
            .wasm-feature * {
                padding: 0;
            }
        
            a {
                text-decoration: none;
                color: inherit;
            }
            a:hover {
                text-decoration: underline;
            }
            
            .tag {
                flex-grow: 1;
                margin: 0 1ex;
            }
            
            .icon {
                width: 1em;
                height: 1em;
                display: inline-block;
                margin-left: 1.5em;
            }
            
            .supported .icon {
                background-image: url("${unsafeCSS(icons["check-circle"])}");
            }
            
            .not-supported .icon {
                background-image: url("${unsafeCSS(icons["times-circle"])}");
            }

            .failed {
                color: #AAA;
            }                
            .failed .icon {
                background-image: url("${unsafeCSS(icons["question-circle"])}");
            }
            
            .in-progress {
                color: #AAA;
            }
            .in-progress .icon {
                background-image: url("${unsafeCSS(icons["sync-alt"])}");
            }
        `;
    }
    
    static get properties() {
       return {
            name: { type: String },
            url: { type: String },
            status: { type: String }
        };
    }

    render() {
        let nameElement = html`<span class="name">${this.name}</span>`;
        if (this.url) {
            nameElement = html`<a class="name" href="${this.url}">${this.name}</span>`;
        }

        return html`
            <div class="wasm-feature ${this.status}">
                ${nameElement}
                <span class="tag">${this.status == "failed" ? "(failed)" : ""}</span>
                <span class="icon"></span>
            </div>
        `;
    }
    
    firstUpdated() {
        const iconNode = this.shadowRoot.querySelector(".icon");
        this._tooltip = tippy(iconNode, {
            placement: "right"
        });
    }

    updated(...args) {
        this._tooltip.setContent(tooltips[this.status]);
    }
}
customElements.define('wasm-feature', WasmFeature);
