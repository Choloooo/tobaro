// House of Tobaro — shared interactions

document.addEventListener('DOMContentLoaded', () => {

  /* mobile nav toggle */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? '✕' : '☰';
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.textContent = '☰';
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  /* mark active nav link */
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === here) a.classList.add('active');
  });

  /* scroll reveal */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* interest chips (contact + partners forms) */
  document.querySelectorAll('.chip-group').forEach(group => {
    const input = group.parentElement.querySelector('input[type="hidden"]');
    const multi = group.dataset.multi === 'true';
    group.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        if (!multi) {
          group.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
        }
        chip.classList.toggle('selected');
        if (input) {
          const selected = Array.from(group.querySelectorAll('.chip.selected')).map(c => c.textContent.trim());
          input.value = selected.join(', ');
        }
      });
    });
  });

  /* form submit -> success state (no backend wired yet) */
  document.querySelectorAll('form[data-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const card = form.closest('.form-card');
      const success = card ? card.querySelector('.form-success') : null;
      form.classList.add('hidden');
      if (success) success.classList.add('show');
    });
  });

});
