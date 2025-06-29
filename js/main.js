// تفعيل تبديل الوضع الليلي/النهاري مع حفظ التفضيل
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

if (localStorage.getItem('theme')) {
  html.setAttribute('data-theme', localStorage.getItem('theme'));
  updateIcon();
}

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateIcon();
});

function updateIcon() {
  const icon = themeToggle.querySelector('i');
  if (html.getAttribute('data-theme') === 'dark') {
    icon.classList.remove('bi-moon');
    icon.classList.add('bi-sun');
  } else {
    icon.classList.remove('bi-sun');
    icon.classList.add('bi-moon');
  }
}

// تأثير موجة عند الضغط على الأزرار (Ripple Effect)
document.querySelectorAll('.btn, .nav-link').forEach(el => {
  el.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    this.appendChild(ripple);

    const max = Math.max(this.offsetWidth, this.offsetHeight);
    ripple.style.width = ripple.style.height = max + 'px';
    ripple.style.left = (e.offsetX - max / 2) + 'px';
    ripple.style.top = (e.offsetY - max / 2) + 'px';

    setTimeout(() => ripple.remove(), 600);
  });
});

// تحريك البطاقات عند الظهور (Fade-in on scroll)
const cards = document.querySelectorAll('.card');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => observer.observe(card));

// ألوان قوس قزح زاهية
const rainbowColors = [
  "#ff595e", // أحمر
  "#ffca3a", // أصفر
  "#8ac926", // أخضر
  "#1982c4", // أزرق
  "#6a4c93", // بنفسجي
  "#ff6f91", // وردي
  "#f9c80e", // ذهبي
  "#43bccd", // فيروزي
  "#f9844a"  // برتقالي
];

// عند مرور الفأرة على البطاقة، غيّر الخلفية بلون عشوائي من قوس قزح
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    const color = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
    this.style.background = color;
    this.style.transition = "background 0.5s cubic-bezier(.4,0,.2,1)";
  });
  card.addEventListener('mouseleave', function() {
    this.style.background = ""; // العودة للستايل الأصلي (Glassmorphism)
  });
});

// إضافة بعض التنميقات عبر CSS للجافاسكريبت
const style = document.createElement('style');
style.innerHTML = `
.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(74,107,255,0.18);
  transform: scale(0);
  animation: ripple-effect 0.6s linear;
  pointer-events: none;
  z-index: 2;
}
@keyframes ripple-effect {
  to {
    transform: scale(2.5);
    opacity: 0;
  }
}
.card {
  position: relative;
  overflow: hidden;
  opacity: 0.7;
  transition: opacity 0.5s;
}
.card.show {
  opacity: 1;
  transition: opacity 0.7s cubic-bezier(.4,0,.2,1);
}
.btn, .nav-link {
  position: relative;
  overflow: hidden;
}
`;
document.head.appendChild(style);

// تأثير تكبير صورة البروفايل عند المرور عليها
const profileImg = document.querySelector('.profile-img-hero img');
if (profileImg) {
  profileImg.addEventListener('mouseenter', function () {
    this.style.transition = "transform 0.5s cubic-bezier(.4,0,.2,1), box-shadow 0.5s";
    this.style.transform = "scale(1.18) translateY(-18px)";
    this.style.zIndex = "10";
    this.style.boxShadow = "0 24px 60px 0 rgba(74,107,255,0.22), 0 2px 12px 0 rgba(0,0,0,0.10)";
  });
  profileImg.addEventListener('mouseleave', function () {
    this.style.transform = "scale(1) translateY(0)";
    this.style.zIndex = "";
    this.style.boxShadow = "";
  });
}

// تحريك الدوائر النسبية (Skill Circles) عند ظهورها في الشاشة
document.addEventListener("DOMContentLoaded", function () {
    const skillCircles = document.querySelectorAll('.skill-circle svg');
    skillCircles.forEach(circleSvg => {
        const percent = circleSvg.parentElement.getAttribute('data-percent');
        const circle = circleSvg.querySelectorAll('circle')[1];
        if (circle) {
            const radius = circle.r.baseVal.value;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (circumference * percent / 100);
            circle.style.strokeDasharray = `${circumference}`;
            circle.style.strokeDashoffset = `${circumference}`;
            circle.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)';
        }
    });

    // عند التمرير، شغل الأنيميشن إذا ظهرت الدوائر
    function animateSkillsOnView() {
        skillCircles.forEach(circleSvg => {
            const rect = circleSvg.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) {
                const percent = circleSvg.parentElement.getAttribute('data-percent');
                const circle = circleSvg.querySelectorAll('circle')[1];
                if (circle && !circle.animated) {
                    const radius = circle.r.baseVal.value;
                    const circumference = 2 * Math.PI * radius;
                    const offset = circumference - (circumference * percent / 100);
                    setTimeout(() => {
                        circle.style.strokeDashoffset = offset;
                        circle.animated = true;
                    }, 200);
                }
            }
        });
    }

    window.addEventListener('scroll', animateSkillsOnView);
    animateSkillsOnView();
});