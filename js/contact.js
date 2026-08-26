/* ==========================================================================
   AHMED — CONTACT PAGE JS
   Handles: contact form submit (client-side, ready to wire to a backend
   or the Admin Panel later)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  const submitBtn = document.getElementById('contactSubmitBtn');
  if (!form || !note || !submitBtn) return;

  const defaultNoteText = note.textContent;

  function handleSubmit() {
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const original = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';

    // Placeholder submit flow — swap this for a real endpoint
    // (e.g. fetch('/api/contact', {...})) once the backend / Admin Panel is wired up.
    setTimeout(() => {
      submitBtn.innerHTML = original;
      submitBtn.disabled = false;

      note.textContent = "Thanks — your message is in. I'll get back to you within a day.";
      note.classList.add('success');

      form.reset();

      setTimeout(() => {
        note.textContent = defaultNoteText;
        note.classList.remove('success');
      }, 6000);
    }, 900);
  }

  // Bound to a direct button click (not the form's native "submit" event) so
  // this works reliably everywhere, including sandboxed preview environments
  // that may block native form submission.
  submitBtn.addEventListener('click', handleSubmit);

  // Also handle Enter-key submission from within the form for accessibility,
  // while still routing through the same logic and never doing a real page submit.
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSubmit();
  });

});
