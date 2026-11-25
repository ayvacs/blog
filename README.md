<h1><a href="https://ave.is-a.dev/blog">ave.is-a.dev/blog</a></h1>

The blog for my personal website, hosting software development blogs, interesting findings, and my 18-page research paper on Quantum Cryptography.

Built from the ground up with an extendable, flexible Markdown to HTML compilation progress; also features a <a href="https://github.com/ayvacs/blog/blob/main/.github/workflows/ci.yml">GitHub Pages workflow</a> to automatically compile, deploy, and serve to the web on each `git push`.

Node.js is used to manage dependencies and provide convenient building and serving scripts.

## Dependencies

* Requires latest node.js and npm
* Install Node dependencies:
```bash
npm i
```

## Build and Serve

```bash
npm run build   # builds to `dist/`
npm run serve   # builds and serves to `localhost:8080`
```

## Repository Structure

| Directory | Description |
| --- | --- |
| `dist/` | Compiled HTML output |
| `docs/` | Markdown source |
| `includes/` | HTML templates |
| `public/` | Resources like images and CSS styles |