/* Portable, client-side enquiry drafting. No network submission, storage or tracking. */
(function () {
  'use strict';
  const recipient = 'troy@ethinx.solutions';
  const form = document.getElementById('scope-form');
  if (!form) return;
  const status = document.getElementById('form-status');
  const draftWrap = document.getElementById('email-draft-wrap');
  const draft = document.getElementById('email-draft');
  const copyStatus = document.getElementById('copy-status');
  const openEmail = document.getElementById('open-email');
  const clean = (value) => String(value || '').trim().replace(/\s+/g, ' ');
  const field = (name) => form.elements.namedItem(name);
  const emailValid = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    draftWrap.hidden = true;
    openEmail.removeAttribute('href');
    ['name', 'business', 'email', 'workload'].forEach((key) => field(key).removeAttribute('aria-invalid'));
    const missing = ['name', 'business', 'email', 'workload'].find((key) => !field(key).value.trim());
    if (missing) {
      status.textContent = 'Please complete your name, business, work email and brief workload description.';
      field(missing).setAttribute('aria-invalid', 'true');
      field(missing).focus();
      return;
    }
    if (!emailValid(clean(field('email').value)) || !field('email').validity.valid) {
      status.textContent = 'Please enter a valid work email address.';
      field('email').setAttribute('aria-invalid', 'true');
      field('email').focus();
      return;
    }
    const wantsPilot = field('enquiryType').value === 'pilot';
    const subject = wantsPilot ? 'Construction Pilot Information' : 'Historical Back-Test Discussion';
    const body = [
      'Hi Troy,', '',
      wantsPilot ? 'Please send information about the same-trade construction pilot. I understand historical validation comes first.' : 'I would like to arrange a 20-minute historical back-test discussion.', '',
      'Name: ' + clean(field('name').value),
      'Business: ' + clean(field('business').value),
      'Work email: ' + clean(field('email').value),
      'Trade: ' + (clean(field('trade').value) || 'To discuss'),
      'Approx. drawing pages / reference BOQ lines: ' + (clean(field('volume').value) || 'To confirm'), '',
      'Workload / question:', field('workload').value.trim(), '',
      'Preferred times and time zone: [add before sending]', '',
      'I will not send project files until scope, confidentiality and handling are agreed.', '',
      'Regards,', clean(field('name').value)
    ].join('\r\n');
    draft.value = 'To: ' + recipient + '\r\nSubject: ' + subject + '\r\n\r\n' + body;
    openEmail.href = 'mailto:' + recipient + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    draftWrap.hidden = false;
    copyStatus.textContent = '';
    status.textContent = 'Draft prepared. Nothing has been sent. Review it, then open your email app or copy it to email Troy.';
  });

  function manualCopy() {
    draft.focus();
    draft.select();
    copyStatus.textContent = 'The draft is selected. Copy it manually and send to ' + recipient + '.';
  }
  document.getElementById('copy-draft').addEventListener('click', function () {
    if (!draft.value) return;
    if (!navigator.clipboard || !window.isSecureContext) return manualCopy();
    navigator.clipboard.writeText(draft.value).then(function () {
      copyStatus.textContent = 'Draft copied. Paste it into your email app and send to ' + recipient + '.';
    }).catch(manualCopy);
  });
}());
