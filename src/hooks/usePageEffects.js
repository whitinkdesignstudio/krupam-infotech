import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function usePageEffects() {
  const location = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    body.classList.add('fx-ready');

    const revealTargets = Array.from(
      document.querySelectorAll(
        '.reveal, .detail-card, .product-list article, .value-grid > article, .contact-row, [data-reveal]'
      )
    );
    const parallaxItems = Array.from(
      document.querySelectorAll('[data-parallax]')
    );

    revealTargets.forEach((target) => {
      target.classList.add('fx-target');
      const group = target.closest('[data-stagger]');
      const siblings = group
        ? Array.from(group.querySelectorAll('.reveal, [data-reveal]'))
        : [];
      const index = siblings.indexOf(target);
      target.style.setProperty(
        '--fx-delay',
        String((Math.max(index, 0) % 4) * 75) + 'ms'
      );
    });

    const observer =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add('is-visible');
                  observer.unobserve(entry.target);
                }
              });
            },
            { threshold: 0.035, rootMargin: '8% 0px 8% 0px' }
          )
        : null;

    revealTargets.forEach((target) => {
      const rect = target.getBoundingClientRect();
      if (rect.top < window.innerHeight * 1.08 && rect.bottom > -80) {
        target.classList.add('is-visible');
      }
      if (observer) {
        observer.observe(target);
      } else {
        target.classList.add('is-visible');
      }
    });

    let animationFrame = 0;
    const updateMotion = () => {
      const max = root.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;

      root.style.setProperty(
        '--page-progress',
        max > 0 ? String(scrollY / max) : '0'
      );
      root.style.setProperty(
        '--hero-content-shift',
        Math.min(scrollY * 0.16, 90) + 'px'
      );
      root.style.setProperty(
        '--hero-content-opacity',
        String(Math.max(1 - scrollY / 780, 0.2))
      );
      root.style.setProperty(
        '--page-hero-shift',
        Math.min(scrollY * -0.09, 0) + 'px'
      );

      parallaxItems.forEach((item) => {
        const speed = Number(item.dataset.parallax || 0);
        const rect = item.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        item.style.setProperty('--parallax-y', center * speed + 'px');
      });

      animationFrame = 0;
    };

    const onScroll = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateMotion);
      }
    };

    updateMotion();
    window.addEventListener('scroll', onScroll, { passive: true });

    const onPointerMove = (event) => {
      root.style.setProperty('--pointer-x', event.clientX + 'px');
      root.style.setProperty('--pointer-y', event.clientY + 'px');
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [location.pathname]);
}

