import { LitElement, html, css, unsafeCSS } from "https://cdn.pika.dev/lit-element/v2";
import icons from "./icons.js";

class WasmFeatureList extends LitElement {
    static get styles() {
        return css`
            :host {
                width: 100%;
            }
            
            .wrapper {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                font-family: sans-serif;
                margin-bottom: 30px;
                padding: 0 30px;
                box-sizing: border-box;
            }
            
            .title, .subtitle, .footer  {
                width: 100%;
                text-align: center;
            }
            
            a {
                text-decoration: none;
                color: #555;
            }
            a:hover {
                text-decoration: underline;
            }
            
            .browser {
                text-transform: capitalize;
            }
            
            .list {
                margin: 50px;
                padding: 10px 0;
                border: 1px solid #CCC;
                border-radius: 5px;
                box-shadow: 0 0 5px rgba(0,0,0,0.2);
                min-width: 90px;
                min-height: 70px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: #FFF;
            }

            .list .loading {
                width: 50px;
                height: 50px;
                padding: 10px 20px;
                display: inline-block;
                background-image: url("${unsafeCSS(icons["sync-alt"])}");
                background-position: center;
                background-size: 50px;
                background-repeat: no-repeat;
            }
        `;
    }
    
    static get properties() {
       return {
            browser: { type: String }
        };
    }
    
    constructor() {
        super();
        this.browser = "...";
    }
    
    render() {
        return html`
            <div class="wrapper">
                <h1 class="title">WebAssembly experimental features support</h1>
                <div class="subtitle">You are using <b class="browser">${this.browser || "..."}</b></div>
                <div class="list">
                    <slot><div class="loading"></div></slot>
                </div>
                <div class="footer">
                Made using <a href="https://github.com/GoogleChromeLabs/wasm-feature-detect">wasm-feature-detect</a>.
                </div>
            </div>
        `;
    }
}
customElements.define('wasm-feature-list', WasmFeatureList);
