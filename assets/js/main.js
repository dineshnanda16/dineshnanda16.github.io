jQuery(window).on('load', function () {
    // HIDE PRELOADER
    $(".preloader").addClass("preloader-hidden");

    // SHOW/ANIMATE ANIMATION CONTAINER
    setTimeout(function () {
        $(".hero .animation-container").each(function () {
            var e = $(this);
            setTimeout(function () {
                e.addClass("run-animation");
            }, e.data("animation-delay"));
        });
    }, 900);
});

jQuery(document).ready(function ($) {
    "use strict";

    // INIT PARALLAX PLUGIN
    $(".hero .background-content.parallax-on").parallax({
        scalarX: 24,
        scalarY: 15,
        frictionX: 0.1,
        frictionY: 0.1,
    });

    // SCROLL REVEAL SETUP
    window.sr = ScrollReveal();
    sr.reveal(".scroll-animated-from-bottom", {
        duration: 600,
        delay: 500,
        origin: "bottom",
        rotate: { x: 0, y: 0, z: 0 },
        opacity: 0,
        distance: "20vh",
        viewFactor: 0.4,
        scale: 1,
        useDelay: 'onload',
    });

    // IMAGE CAROUSEL
    $('.image-carousel').owlCarousel({
        center: true,
        items: 1,
        loop: true,
        margin: 0,
        autoplay: true,
        responsive: {
            800: {
                items: 2,
            },
        }
    });

    // JavaScript to hide and show elements based on scroll direction
    let lastScrollTop = 0; // Track the last scroll position
    const animationContainers = document.querySelectorAll('.animation-container, .animation-fade-left');

    window.addEventListener('scroll', function () {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Loop through all animation containers (h1, p)
        animationContainers.forEach(container => {
            const h1 = container.querySelector('h1');
            const pElements = container.querySelectorAll('p');

            // If scrolling down, hide the name and subline
            if (currentScrollTop > lastScrollTop) {
                if (h1) h1.classList.add('hidden');
                pElements.forEach(p => p.classList.add('hidden'));
            } else {
                // If scrolling up, show the name and subline
                if (h1) h1.classList.remove('hidden');
                pElements.forEach(p => p.classList.remove('hidden'));
            }
        });

        // Update last scroll position
        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    });

    // NAVIGATION BUTTON SCROLL BEHAVIOR WITH HORIZONTAL EASING FOR ALL BUTTONS
    const navigationButtons = document.querySelectorAll('.navigation-button-1, .navigation-button-2, .navigation-button');

    let lastScrollTopNav = 0;

    // Add transitions for smooth effects
    navigationButtons.forEach(button => {
        button.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    });

    window.addEventListener('scroll', function () {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        const scrollDirection = currentScroll > lastScrollTopNav ? 'down' : 'up';

        // Apply the horizontal movement logic to navigation buttons
        function navigationButtonHide(button, calculatedTranslateHeader) {
            if (calculatedTranslateHeader <= 200) {
                button.style.transform = `translateX(${calculatedTranslateHeader}%) translateY(-50%)`;
            } else if (currentScroll > window.innerHeight) {
                button.style.transform = `translateX(200%) translateY(-50%)`;
            }
        }

        // Calculate the translation value
        const scrollOffset = $(window).scrollTop();
        const windowHeight = $(".hero").height();
        const calculatedTranslateHeader = (scrollOffset / windowHeight) * 200;

        // Apply the hide effect to all buttons
        navigationButtons.forEach(button => {
            navigationButtonHide(button, calculatedTranslateHeader);
        });

        lastScrollTopNav = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative values
    });

    // HERO/BUTTON ON SCROLL ANIMATING
    function onScrollAnimating() {
        var windowHeight = $(".hero").height(),
            frontContent = $(".hero .front-content"),
            backContent = $(".hero .background-content"),
            scrollOffset,
            calculatedOpacityFrontContent,
            calculatedScaleFrontContent,
            calculatedTranslateHeader,
            calculatedOpacityBackground;

        function runStep() {
            scrollOffset = $(window).scrollTop();

            if (windowHeight > scrollOffset && scrollOffset >= 0) {
                calculatedTranslateHeader = (scrollOffset / windowHeight) * 650;
                calculatedOpacityFrontContent = 1 - (scrollOffset / windowHeight) * 4.2;
                calculatedScaleFrontContent = 1 - (scrollOffset / windowHeight) * 1.2;
                calculatedOpacityBackground = 1 - (scrollOffset / windowHeight) * 1.4;
            }
        }

        $(window).on('resize', function () {
            windowHeight = $(".hero").height();
        });

        $(window).scroll(function () {
            runStep();
        });

        runStep();
    }

    onScrollAnimating();
});
