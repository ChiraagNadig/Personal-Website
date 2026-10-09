const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

/*================================= toggle icon navbar ===================================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

function setMenuOpen(open) {
    menuIcon.classList.toggle('fa-xmark', open);
    navbar.classList.toggle('active', open);
    menuIcon.setAttribute('aria-expanded', String(open));
}

menuIcon.onclick = () => {
    setMenuOpen(!navbar.classList.contains('active'));
};

document.addEventListener("DOMContentLoaded", function() {
  let details = navigator.userAgent;
  let regexp = /android|iphone|kindle|ipad/i;
  let isMobileDevice = regexp.test(details);

  if (isMobileDevice) {
      document.body.classList.add('mobile-device');

      // Change hover to click behavior for portfolio section on mobile
      document.querySelectorAll('.portfolio-box').forEach(function(box) {
        box.addEventListener('click', function() {
          const link = this.querySelector('.portfolio-layer a');
          if (link) {
              link.click();
          }
        });
      });
  } else {
      document.body.classList.add('desktop-device');
  }

  // Cursor trail: only for mouse users who haven't asked for reduced motion
  if (hasFinePointer && !prefersReducedMotion && !isMobileDevice) {
      const coords = { x: 0, y: 0 };
      const circles = document.querySelectorAll(".circle");

      const colors = [
        "#6c18f4", "#7b31f4", "#8943f5", "#9654f5", "#a164f5", "#ac73f6", "#b682f6", "#bf91f5", "#c8a0f5", "#d0aef5", "#d8bdf5", "#e0ccf4"
      ];

      circles.forEach(function (circle, index) {
        circle.x = 0;
        circle.y = 0;
        circle.style.backgroundColor = colors[index % colors.length];
      });

      window.addEventListener("mousemove", function(e){
        coords.x = e.clientX;
        coords.y = e.clientY;
      });

      function animateCircles() {
        let x = coords.x;
        let y = coords.y;

        circles.forEach(function (circle, index) {
          circle.style.left = x - 12 + "px";
          circle.style.top = y - 12 + "px";

            circle.style.scale = (circles.length - index) / circles.length;

            circle.x = x;
            circle.y = y;

            const nextCircle = circles[index + 1] || circles[0];
            x += (nextCircle.x - x) * 0.3;
            y += (nextCircle.y - y) * 0.3;
          });
          requestAnimationFrame(animateCircles);
        }
      animateCircles();
  } else {
      document.querySelectorAll(".circle").forEach(function (circle) {
        circle.style.display = 'none';
      });
  }
});


/*================================= scroll section active link ===================================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + id);
            });
        };
    });

    /*================================= sticky navbar ===================================*/
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /*================================= remove toggle icon and navbar ===================================*/
    setMenuOpen(false);
};

/*================================= reveal on scroll ===================================*/
// Content is only hidden once JS has marked it, so it never stays invisible if this fails.
const revealGroups = [
    { selector: '.home-content, .heading', origin: 'top' },
    { selector: '.home-img, .experience-container, .portfolio-box, .campus-container', origin: 'bottom' },
    { selector: '.home-content h1, .about-img', origin: 'left' },
    { selector: '.home-content p, .about-content', origin: 'right' }
];

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });

    revealGroups.forEach(group => {
        document.querySelectorAll(group.selector).forEach(el => {
            el.classList.add('js-reveal', 'reveal-' + group.origin);
            observer.observe(el);
        });
    });
}


/*================================= typed js ===================================*/

if (prefersReducedMotion) {
    document.querySelector('.multiple-text').textContent = 'Software Engineer';
} else {
    new Typed('.multiple-text', {
        strings: ['Software Engineer', 'Builder', 'AI Enthusiast'],
        typeSpeed: 70,
        backSpeed: 70,
        backDelay: 1000,
        loop: true,
    });
}
