# ETHINX Construction Estimation Extraction

The version-2 ETHINX Solutions landing page for historical construction quantity takeoff validation. It is a portable static website: plain HTML, CSS, optional client-side JavaScript and local assets. No framework, build pipeline, backend, payment facility or proprietary runtime is required.

**Intended domain:** https://ethinx.solutions/  
**Enquiry contact:** troy@ethinx.solutions

## Website files

All public website files are in [`site/`](site/): `index.html`, `styles.css`, `app.js`, local favicons, social-preview image, touch icon, sitemap, robots file and a plain-file GitHub Pages marker.

The page focuses on estimator workload, completed-project historical validation and human-reviewed results. Version 2 includes the strengthened hero, executive summary, founder context, ideal-client qualification and more explicit meeting requests. See [conversion changes](CONVERSION_CHANGES.md).

## Cloudflare Pages: Git-connected deployment

Connect this repository in **Cloudflare → Workers & Pages → Pages → Import an existing Git repository**. Use:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | `None` |
| Build command | `exit 0` |
| Build output directory | `site` |
| Repository/root directory | Default repository root |

No dependency installation is necessary. Test the generated Pages URL before deliberately connecting `ethinx.solutions`.

**Root-domain caution:** replacing the existing apex site changes the current homepage. Legacy Shortform routes are not included in this export. Preserve their origin/routing where required, and preserve MX, SPF, DKIM and DMARC records during any web-DNS cutover. Do not create a separate construction subdomain as part of this handover.

The [deployment guide](DEPLOYMENT.md) also covers Pages Direct Upload, asset-only Cloudflare Workers, Hetzner/Nginx, Netlify and GitHub Pages. Its ZIP-extraction steps apply to the downloadable export packages; when working from this repository, the `site/` directory is already present.

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

The supplied [local test summary](test-results.json) records responsive layout and email-draft checks. The [amendment checks](conversion-amendments-check.json) record preservation of protected offer/governance content. Scope, risks, human review and client approval requirements remain explicit.

Repository source delivery is separate from Cloudflare deployment, DNS cutover, inbox delivery or a confirmed meeting. A passing local test or a GitHub push does not verify a live website. [STATUS.md](STATUS.md) contains the historical export-stage status; this README describes the repository handover.
