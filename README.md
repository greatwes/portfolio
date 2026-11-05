# Portfolio — Wesley Okoye

Personal portfolio site. Static HTML/CSS/JS, no build step, no dependencies.

Live project sources linked from the site:

- [global-rate-limiter](https://github.com/greatwes/global-rate-limiter)
- [biometric-attendance-pipeline](https://github.com/greatwes/biometric-attendance-pipeline)
- [dataiku-mcp-server](https://github.com/greatwes/dataiku-mcp-server)
- [training-attendance-sync](https://github.com/greatwes/training-attendance-sync)
- [transaction-reconciliation-ticketing](https://github.com/greatwes/transaction-reconciliation-ticketing)

## Run locally

Any static file server works, e.g.:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy

Deployed on [Netlify](https://netlify.com) from this repo. `netlify.toml` sets the publish
directory to the repo root and adds a few baseline security headers — no build command needed.
