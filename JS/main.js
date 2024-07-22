/*================================= toggle icon navbar ===================================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active')
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
              this.classList.toggle('clicked');
              const link = this.querySelector('.portfolio-layer a');
              if (link) {
                  link.click();
              }
          });
      });
  } else {
      document.body.classList.add('desktop-device');

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
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    /*================================= sticky navbar ===================================*/
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /*================================= remove toggle icon and navbar ===================================*/
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};

/*================================= scroll reveal ===================================*/
ScrollReveal({
    //reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal('.home-content, heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });


/*================================= typed js ===================================*/

const typed = new Typed('.multiple-text', {
    strings: ['Tech Entrepreneur', 'AI Engineer', 'CS Student'],
    typeSpeed: 70,
    backSpeed: 70,
    backDelay: 1000,
    loop: true,
});
