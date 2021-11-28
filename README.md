# datasette-table

A (highly experimental) Web Component for embedding a [Datasette](https://datasette.io/) table on a page.

## Usage

```html
<script type="module" src="https://unpkg.com/datasette-table?module"></script>

<datasette-table
    url="https://global-power-plants.datasettes.com/global-power-plants/global-power-plants.json"
></datasette-table>
```

## Development

Check out this repository, then run:

    cd datasette-table
    npm install

Then to start a local development server (using Vite):

    npm run dev

Then visit `http://localhost:3000/`