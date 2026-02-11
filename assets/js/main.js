// ========== SECTION NAVIGATION ==========

function showSection(targetId, pushState) {
    if (pushState === undefined) pushState = true;

    document.querySelectorAll('section').forEach(function (s) {
        s.classList.remove('active');
    });
    var target = document.getElementById(targetId);
    if (target) {
        target.classList.add('active');
    }

    document.querySelectorAll('.nav-item').forEach(function (btn) {
        btn.classList.remove('active');
        if (btn.dataset.target === targetId) {
            btn.classList.add('active');
        }
    });

    if (pushState) {
        history.pushState(null, '', '#' + targetId);
    }
}

document.querySelectorAll('.nav-item').forEach(function (btn) {
    btn.addEventListener('click', function () {
        var target = this.dataset.target;
        if (!target) return;
        showSection(target);

        // Close mobile menu if open
        var sidebar = document.getElementById('sidebar');
        var hamburger = document.getElementById('hamburger');
        if (sidebar.classList.contains('menu-open')) {
            sidebar.classList.remove('menu-open');
            hamburger.classList.remove('open');
        }
    });
});

// Handle browser back/forward
window.addEventListener('popstate', function () {
    var hash = window.location.hash.replace('#', '');
    if (hash) {
        showSection(hash, false);
    } else {
        showSection('about', false);
    }
});

// Handle initial route
(function handleInitialRoute() {
    var hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
        showSection(hash, false);
    }
})();

// ========== DARK MODE ==========

function updateThemeIcons(isLight) {
    var iconClass = isLight ? 'fas fa-moon' : 'fas fa-sun';
    var toggleDesktop = document.querySelector('#themeToggle i');
    var toggleMobile = document.querySelector('#themeToggleMobile i');
    if (toggleDesktop) toggleDesktop.className = iconClass;
    if (toggleMobile) toggleMobile.className = iconClass;
}

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    var isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('light-mode', isLight ? 'true' : 'false');
    updateThemeIcons(isLight);
}

// Load saved theme (dark by default)
if (localStorage.getItem('light-mode') === 'true') {
    document.body.classList.add('light-mode');
    updateThemeIcons(true);
}

document.getElementById('themeToggle').addEventListener('click', toggleTheme);
document.getElementById('themeToggleMobile').addEventListener('click', toggleTheme);

// ========== HAMBURGER MENU (MOBILE) ==========

var hamburger = document.getElementById('hamburger');
var sidebar = document.getElementById('sidebar');

hamburger.addEventListener('click', function () {
    this.classList.toggle('open');
    sidebar.classList.toggle('menu-open');
});

// ========== TYPEWRITER EFFECT ==========

(function typewriter() {
    var words = ['RAG systems.', 'PyTorch.', 'FastAPI.', 'multi-agent systems.', 'deep learning.', 'recommendation systems.'];
    var el = document.getElementById('typewriter-text');
    if (!el) return;

    var wordIndex = 0;
    var charIndex = 0;
    var isDeleting = false;

    function tick() {
        var currentWord = words[wordIndex];

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        el.textContent = currentWord.substring(0, charIndex);

        var delay = isDeleting ? 80 : 120;

        if (!isDeleting && charIndex === currentWord.length) {
            delay = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delay = 400;
        }

        setTimeout(tick, delay);
    }

    tick();
})();
