import {LitElement, html, css} from 'lit';
export class DatasetteTable extends LitElement {
  static get styles() {
    return css`
      :host {
        font-family: Helvetica, sans-serif;
      }
      div {
        overflow: auto;
        width: 100%;
      }
      th {
        padding-right: 1em;
        text-align: left;
      }
      td {
        border-top: 1px solid #aaa;
        border-right: 1px solid #eee;
        padding: 5px;
        vertical-align: top;
        white-space: pre-wrap;
        line-height: 1.2;
      }
    `;
  }

  static get properties() {
    return {
      url: { type: String },
      data: { attribute: false },
    };
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  fetchData() {
    fetch(this.url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network error");
        }
        return response.json();
      })
      .then((data) => {
        this.data = data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  render() {
    if (!this.data) {
      return html` <h4>Loading...</h4> `;
    }
    return html` <div>
      <h3>
        <a href="${this.url.replace(".json", "")}"> ${this.data.table} </a>
      </h3>
      <table>
        <thead>
          <tr>
            ${this.data.columns.map((column) => html`<th>${column}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${this.data.rows.map(
            (row) =>
              html`<tr>
                ${row.map((cell) => html`<td>${cell}</td>`)}
              </tr>`
          )}
        </tbody>
      </table>
    </div>`;
  }
}
customElements.define("datasette-table", DatasetteTable);
