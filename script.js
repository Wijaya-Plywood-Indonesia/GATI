document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Tahun otomatis di footer ---------- */
  const tahunEl = document.getElementById('tahun');
  if (tahunEl) tahunEl.textContent = new Date().getFullYear();

  /* ---------- Navbar: mengecil + bayangan saat scroll ---------- */
  const navbar = document.getElementById('navbar');
  const progresGulir = document.getElementById('progresGulir');

  const perbaruiScroll = () => {
    const y = window.scrollY;
    navbar.classList.toggle('navbar--kecil', y > 40);

    const tinggiDokumen = document.documentElement.scrollHeight - window.innerHeight;
    const persen = tinggiDokumen > 0 ? (y / tinggiDokumen) * 100 : 0;
    progresGulir.style.width = persen + '%';
  };
  perbaruiScroll();
  window.addEventListener('scroll', perbaruiScroll, { passive: true });

  /* ---------- Hamburger menu (mobile) ---------- */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  const tutupMenu = () => {
    navMenu.classList.remove('is-buka');
    hamburger.classList.remove('is-buka');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  hamburger.addEventListener('click', () => {
    const buka = navMenu.classList.toggle('is-buka');
    hamburger.classList.toggle('is-buka', buka);
    hamburger.setAttribute('aria-expanded', String(buka));
  });

  document.querySelectorAll('.nav__tautan').forEach(tautan => {
    tautan.addEventListener('click', tutupMenu);
  });

  /* ---------- Scrollspy: highlight menu aktif ---------- */
  const seksi = document.querySelectorAll('main section[id]');
  const tautanNav = document.querySelectorAll('.nav__tautan');

  const scrollSpy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const tautanTerkait = document.querySelector(`.nav__tautan[href="#${id}"]`);
      if (!tautanTerkait) return;
      if (entry.isIntersecting) {
        tautanNav.forEach(t => t.classList.remove('is-aktif'));
        tautanTerkait.classList.add('is-aktif');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  seksi.forEach(s => scrollSpy.observe(s));

  /* ---------- Reveal on scroll ---------- */
  const elemenReveal = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-tampil');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  elemenReveal.forEach(el => revealObserver.observe(el));

  /* ---------- Signature: animasi lapisan plywood ---------- */
  const lapisanVisual = document.getElementById('lapisanVisual');
  if (lapisanVisual) {
    const lapisanObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          lapisanVisual.classList.add('lapisan-aktif');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    lapisanObserver.observe(lapisanVisual);
  }

  /* ---------- Tab switcher: Ukuran & Kegunaan ---------- */
  const tabTombol = document.querySelectorAll('.ukuran__tab');
  const panelUkuran = document.querySelectorAll('.ukuran__panel');
  const indikator = document.getElementById('ukuranIndikator');

  const posisikanIndikator = (tombol) => {
    if (!indikator || !tombol) return;
    indikator.style.transform = `translateX(${tombol.offsetLeft - 6}px)`;
  };

  const aktifkanTab = (ukuran) => {
    tabTombol.forEach(t => {
      const aktif = t.dataset.tab === ukuran;
      t.classList.toggle('is-aktif', aktif);
      t.setAttribute('aria-selected', String(aktif));
      if (aktif) posisikanIndikator(t);
    });
    panelUkuran.forEach(p => {
      p.classList.toggle('is-aktif', p.dataset.panel === ukuran);
    });
  };

  tabTombol.forEach(tombol => {
    tombol.addEventListener('click', () => aktifkanTab(tombol.dataset.tab));
  });

  // Posisikan indikator awal & saat resize
  const tabAwal = document.querySelector('.ukuran__tab.is-aktif');
  requestAnimationFrame(() => posisikanIndikator(tabAwal));
  window.addEventListener('resize', () => {
    const tabAktifSaatIni = document.querySelector('.ukuran__tab.is-aktif');
    posisikanIndikator(tabAktifSaatIni);
  });

  /* ---------- Smooth scroll dengan offset navbar ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 78;
      const posisi = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: posisi, behavior: 'smooth' });
    });
  });

});
