# Live deployment status — 27 October 2026

**Live website:** https://ethinx.solutions/  
**Source:** https://github.com/ethinxsolutionsau-prog/Construction-Estimator-Website  
**Enquiry contact:** troy@ethinx.solutions

## Completed

The v2 static homepage is deployed through GitHub-connected Cloudflare Pages. Project: `ethinx-construction-landing`; production branch: `main`; build command: `exit 0`; output: `site`; repository root: `/`.

A hosting-only Worker, `ethinx-construction-homepage`, serves the new homepage and its named public files at the existing root domain. Other paths retain the original Hetzner origin. The website source remains plain HTML, CSS, JavaScript and local assets, without a proprietary runtime or payment integration.

## Verified

The live root returns the requested headline and correctly addressed historical, pilot and completed-project email links. Eight public assets match the repository source exactly. Phone and desktop layouts were checked, and the live historical/pilot email-draft form works without sending or storing an enquiry automatically. No browser script errors were observed.

Five existing Shortform pages retain HTTP 200 and their legacy application identity: `/new`, `/order`, `/question`, `/enterprise` and `/privacy`. Four legacy static assets match their pre-cutover checksums. Dynamically rendered legacy HTML varies between successive requests, so it was not represented as byte-identical.

The original apex web DNS, three MX records and SPF record were verified unchanged. The existing API Worker route is unchanged. No DNS or payment facility was modified, and no paid plan was purchased or enabled.

## Boundaries and next action

No email was sent, inbox delivery was not tested, no meeting was booked, and no customer payment or live takeoff-processing validation was performed. This delivery establishes the live sales landing page, not pilot revenue.

Use **https://ethinx.solutions/** in the completed five-company outreach. Website-file changes pushed to `main` deploy through Pages; changes to the hosting router require a separate Worker upload. See [deployment instructions and rollback](DEPLOYMENT.md).
