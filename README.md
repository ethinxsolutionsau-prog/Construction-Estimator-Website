# ETHINX Construction Estimation Extraction

The version-2 ETHINX Solutions landing page for historical construction quantity takeoff validation. It is a portable static website: plain HTML, CSS, optional client-side JavaScript and local assets. No framework, backend, payment facility or proprietary runtime is required.

**Live website:** https://ethinx.solutions/  
**Enquiry contact:** troy@ethinx.solutions

## Website files

All public website files are in [`site/`](site/): `index.html`, `styles.css`, `app.js`, local favicons, social-preview image, touch icon, sitemap, robots file and a plain-file GitHub Pages marker.

The page focuses on estimator workload, completed-project historical validation and human-reviewed results. Version 2 includes the strengthened hero, executive summary, founder context, ideal-client qualification and more explicit meeting requests. See [conversion changes](CONVERSION_CHANGES.md).

## Current Cloudflare deployment

This repository is connected to Pages project `ethinx-construction-landing`. Website-file changes pushed to `main` trigger deployments. The settings are:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | `None` |
| Build command | `exit 0` |
| Build output directory | `site` |
| Repository/root directory | `/` |

No dependency installation or generated application build is necessary.

The live root domain uses a hosting-only Worker, `ethinx-construction-homepage`, to serve the homepage and its explicitly named public files from Pages. Other URLs keep the original Hetzner origin. This preserves the existing Shortform pages and legacy assets without changing apex web DNS, email DNS or the existing API-subdomain route. No construction subdomain was created.

The routing source is [`deployment/root-router.js`](deployment/root-router.js), outside the portable website directory. Router changes require a separate Worker upload; Pages builds do not apply them. Add any new homepage assets to its allowlist when extending the current split-hosting arrangement.

**Do not repoint the apex DNS entirely to Pages while retaining the legacy origin.** See the [deployment guide and rollback instructions](DEPLOYMENT.md) before changing routing. Its Pages Direct Upload, asset-only Workers, Hetzner/Nginx, Netlify and GitHub Pages instructions describe alternative deployments of the same website files, not outstanding tasks for the current live site.

## Local preview

Open `site/index.html` directly, or use any static HTTP server. For example:

```bash
python3 -m http.server 8080 --directory site
```

Visit `http://localhost:8080/`. Python is only an optional local preview tool, not a deployed dependency.

## Enquiry behaviour

- **Book a Historical Back-Test Discussion** opens a prefilled email requesting a 20-minute discussion.
- **Request Pilot Information** opens a separate information request.
- **Discuss A Completed Project** opens an email with subject `Completed Project Discussion` and the requested company/project fields.
- The optional form prepares an email draft locally. Nothing is sent or stored automatically. Visitors review and send using their email application, or copy the draft.

These actions request a meeting; they do not confirm a calendar booking. No drawings are required for the initial conversation.

## Verification and delivery boundary

The live root-domain headline, CTAs, eight source-matched assets and phone/desktop email-draft behaviour were checked. Five retained Shortform pages return HTTP 200 with their legacy application identity, and four legacy static assets retain their pre-cutover checksums. Apex web DNS, MX, SPF and the original API route were verified unchanged.

The supplied [local test summary](test-results.json) records the original responsive-layout and email-draft checks. The [amendment checks](conversion-amendments-check.json) record preservation of protected offer/governance content. Scope, risks, human review and client approval requirements remain explicit.

[STATUS.md](STATUS.md) records the current live delivery and its boundaries. No email was sent, inbox delivery was not tested, no meeting was booked and no customer payment was submitted during verification.
