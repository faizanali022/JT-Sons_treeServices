document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    const overlay = document.querySelector('.mobile-overlay');
    const body = document.body;

    if (!hamburger || !navbar) {
        console.error('Required elements not found');
        return;
    }

    // Initially, set navbar off-screen and style via JS
    function setMobileStyles(active) {
        if (window.innerWidth <= 768) {
            if (active) {
                navbar.style.left = '0';
                navbar.style.backgroundColor = '#000000';
                navbar.style.display = 'block';
                // Set all links to white
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.style.color = '#ffffff';
                });
                if (overlay) overlay.style.display = 'block';
                body.style.overflow = 'hidden';
            } else {
                navbar.style.left = '-100%';
                if (overlay) overlay.style.display = 'none';
                body.style.overflow = '';
            }
        }
    }

    // Toggle on hamburger click
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const isActive = navbar.style.left === '0px';
        setMobileStyles(!isActive);
        hamburger.classList.toggle('active'); // optional for icon animation
    });

    // Close on overlay click
    if (overlay) {
        overlay.addEventListener('click', function() {
            setMobileStyles(false);
            hamburger.classList.remove('active');
        });
    }

    // Close on link click
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            setMobileStyles(false);
            hamburger.classList.remove('active');
        });
    });

    // Reset on resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Reset all inline styles when going to desktop
            navbar.style.left = '';
            navbar.style.backgroundColor = '';
            navbar.style.display = '';
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.style.color = '';
            });
            if (overlay) overlay.style.display = '';
            body.style.overflow = '';
            hamburger.classList.remove('active');
        }
    });

    // Initial call for mobile
    if (window.innerWidth <= 768) {
        setMobileStyles(false);
    }
});