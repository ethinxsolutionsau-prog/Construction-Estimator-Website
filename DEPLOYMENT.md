# ETHINX Solutions — portable static website

**Business:** ETHINX Construction Estimation Extraction  
**Intended production URL:** https://ethinx.solutions/  
**Contact:** troy@ethinx.solutions  
**Prepared:** 27 October 2026, Adelaide

This is a complete static enquiry landing page. The website is plain HTML, CSS, JavaScript and local images. There is no framework, build process, server-side application, database, proprietary runtime, payment integration or Manus hosting dependency. All public website files are in `site/`.

The export has not been deployed. No DNS records, Cloudflare routes, live homepage or existing repository have been changed by this handover.

## Files

```text
site/
  index.html                  Complete homepage and search/social metadata
  styles.css                  Responsive design, focus and reduced-motion styles
  app.js                      Client-side email drafting only
  favicon.svg                 Scalable local brand mark
  favicon.png                 PNG favicon fallback
  robots.txt                  Crawl instructions for intended root domain
  sitemap.xml                 Intended root-domain URL
  .nojekyll                   GitHub Pages plain-file marker
  assets/
    social-preview.png        Local 1200 × 630 link-preview image
    apple-touch-icon.png      Local 180 × 180 icon

deployment/
  wrangler.toml               Optional asset-only Workers configuration
DEPLOYMENT.md                 This guide
```

`ETHINX_Website_Only_v2.zip` contains the **contents of `site/` at the archive root**. Use this ZIP for drag-and-drop website uploads. `ETHINX_Complete_Source_v2.zip` includes `site/`, optional deployment configuration, this guide and the test summary. Do not upload the full handover ZIP as the web root: choose its `site/` directory.

## What the CTAs do

**Book a Historical Back-Test Discussion** prepares an email to Troy asking to arrange a 20-minute discussion. **Request Pilot Information** prepares a different email requesting information about the later same-trade pilot. **Discuss A Completed Project** uses subject **Completed Project Discussion** and asks for Company, Trade, Project Type, Approximate Drawing Count and Preferred Meeting Time. No project files are needed for the initial discussion.

These are email requests, not calendar bookings. A meeting is confirmed separately. The optional enquiry form validates details and prepares a draft locally; the visitor explicitly opens their email app or copies the message. Nothing is submitted automatically. If no mail application is configured, the visible address and copy option provide a fallback.

The core page, direct email links and FAQs remain usable without JavaScript. There is no drawing upload, payment facility or takeoff-processing application on this page. It describes the scoped service and its deliverables, not a tested software interface. No email was sent during testing and inbox delivery has not been verified.

## Recommended: Cloudflare Pages with GitHub

Use this route if you want GitHub version history and deployment on future pushes. Do not choose Direct Upload first if you want native Git integration: Cloudflare requires a separate project to change between those project types.

1. Extract `ETHINX_Complete_Source_v2.zip`.
2. Create or choose a **dedicated repository** for this static site. Keep it private if your Cloudflare account supports that integration. Do not overwrite an existing product repository.
3. Commit `site/`, `deployment/` and this guide. No dependency installation is needed. GitHub push is not performed by this export.
4. In Cloudflare, open **Workers & Pages → Create application → Pages → Import an existing Git repository**. Dashboard wording can vary; select the Pages Git-import flow rather than a framework scaffold.
5. Select the repository and production branch, for example `main`.
6. Set **Framework preset: None**, **Build command: `exit 0`**, **Build output directory: `site`**. Leave the repository/root-directory setting at its default. There is no generated `dist/` folder.
7. Deploy to the generated `*.pages.dev` URL first. Test before connecting the business domain.

If your repository contains only the website files at its root instead of the supplied full package layout, use `.` as the build output directory. Do not change HTML, CSS or JavaScript for either layout.

## Alternative: Pages drag-and-drop, no Git required

1. Open **Workers & Pages → Create application** and choose the **Pages / Direct Upload / Upload assets** option.
2. Give the project a name, such as `ethinx-construction-landing`.
3. Upload `ETHINX_Website_Only_v2.zip`, or drag the **contents** of `site/`. Confirm `index.html` is at the uploaded root—not inside an extra directory.
4. Deploy and test the generated Pages URL.
5. Keep subsequent versions in your own source archive or repository. Direct Upload does not provide native Git-connected deployment for that same project.

For CLI upload, after installing/authenticating Cloudflare's deployment CLI, run from the extracted full-source directory:

```bash
npx wrangler login
npx wrangler pages deploy site --project-name ethinx-construction-landing --branch main
```

This uploads the directory, not a ZIP. It creates/updates a deployment in your Cloudflare account; run it only when you intend to publish. Wrangler is a deployment tool, **not a website runtime dependency**.

## Connect ethinx.solutions safely

**The existing root domain currently serves an ETHINX Shortform website. Moving its root to this export will replace that homepage. The old `/new`, `/order`, `/question`, `/enterprise` and `/privacy` routes are not included in this static site and will not continue automatically.**

Before a production cutover:

1. Record the current apex (`@`) web DNS record, current origin/deployment and any Worker or routing rules applying to the root. Keep a rollback copy.
2. Decide how to retain any existing Shortform routes. Keep the current origin available until those routes have been deliberately retained, moved or retired. This export does not perform that migration.
3. In the Pages project, open **Custom domains → Set up a domain**, enter **`ethinx.solutions`**, then complete domain association and certificate activation. A domain managed as a Cloudflare zone can use the apex-domain flow.
4. Inspect the proposed apex web-record replacement. The root cannot simultaneously be pointed at the old origin and the new Pages target through conflicting records. Remove/replace only the conflicting web record when deliberately cutting over.
5. **Do not delete or replace MX records or email-related TXT/CNAME records** used for SPF, DKIM or DMARC. Preserve other product/API subdomains. Do not create a construction subdomain as part of this launch.
6. Wait for the Pages custom domain to show active. Verify HTTPS, the homepage, icons, both email CTAs and any retained legacy routes. A Cloudflare custom domain must be associated in Pages—not just manually pointed at `*.pages.dev` in DNS.
7. Keep the previous origin and recorded settings for rollback. Revert only the changed web-routing configuration if needed; Cloudflare domain/certificate activation may take time when switching targets again.

No domain connection or live replacement has been performed. The page is prepared for the apex URL, not a new product subdomain.

## Portability: the same website files on other hosts

The site uses relative paths for its stylesheet, script, icons and internal navigation. No site-source changes are needed to serve it on the following hosts. Host/account setup is still required. Canonical, sitemap and social-image metadata intentionally name **https://ethinx.solutions/**; update those metadata only if you deliberately choose a different permanent public URL.

### Cloudflare Workers — static assets only

The optional `deployment/wrangler.toml` serves `../site`. It needs no Worker application script, API or framework. From the full-source root:

```bash
npx wrangler login
npx wrangler deploy --config deployment/wrangler.toml
```

The configuration enables the normal Workers preview hostname but contains **no custom domain or production route**, so publishing it does not redirect the business domain. Add a custom domain only after reviewing the existing root routing. Use Pages for the recommended launch if you do not need Workers.

### Hetzner / Nginx

Copy the contents of `site/` into a dedicated document root on your existing server, then point an existing or separately reviewed Nginx virtual host at that directory. Example virtual-host fragment:

```nginx
root /var/www/ethinx-construction;
index index.html;

location / {
    try_files $uri $uri/ =404;
}
```

Add the usual `server_name ethinx.solutions;` and your existing HTTPS configuration to the appropriate server block. This is a fragment, not a replacement for the full Nginx configuration. Validate with `nginx -t` before reloading. Do not overwrite an existing root directory or unrelated server block. Existing Hetzner charges still apply; this site requires no additional application server.

### Netlify

Drag `site/` into Netlify's manual-deploy uploader, or connect your repository with **publish directory: `site`**, no build command. No functions or package installation are needed. Connect your domain after the same root-site cutover review.

### GitHub Pages

Use the same site files. For branch-based Pages, copy the **contents** of `site/` to the root of a dedicated publishing branch (or its `docs/` publishing folder), retaining `.nojekyll`, and select that branch/folder under repository **Settings → Pages**. This changes repository layout, not website source. The main `.html`, CSS, script and images are unchanged. GitHub plan/repository visibility restrictions may apply.

Relative references also work under a GitHub project path or `/construction/`; production metadata remains the intended apex domain. Do not add the provided root sitemap/robots file over another site's existing files when publishing only a subdirectory.

## Local preview

No install/build step is needed. Open `site/index.html` directly, or serve it locally:

```bash
python3 -m http.server 8080 --directory site
```

Then open `http://localhost:8080/`. You can use any ordinary static HTTP server instead of Python.

## Release check

Before adding the root link to outreach emails, confirm the **live** page is deployed: HTTPS homepage loads; assets return successfully; no horizontal page overflow on phone; both CTAs address Troy with the correct subject; FAQs open; draft validation works; no form implies that a message has been sent or a meeting booked. Send a controlled enquiry yourself to verify the inbox and confirm meeting availability. Review any retained legacy routes and domain email delivery after cutover.

The static source and local browser tests are completed separately from production deployment. A local passing test is not a live deployment or a confirmed meeting.

## Official Cloudflare references

- [Static HTML build settings](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)
- [Direct Upload and project-type restrictions](https://developers.cloudflare.com/pages/get-started/direct-upload/)
- [Pages custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- [Workers static assets](https://developers.cloudflare.com/workers/static-assets/)

No recurring proprietary landing-page service is required. Hosting charges, if any, depend on your provider plan and usage; no new paid service has been purchased.
