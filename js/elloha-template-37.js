$(document).ready(function () {
    // ****** Mobile Nav et switch btn/title
    var MobNav = $('.navbar-toggler');
    MobNav.on('click', function () {
        $('.menu-mobile').toggleClass('menu-mobile-active');
        $('.navbar-toggler .btn-menu').toggleClass('d-none');
        
        if ($('.navbar-toggler .btn-bars').hasClass('d-none')) {
            $('.btn-resa-menu-contain').removeClass('d-none');
            $('.logo-top').addClass('d-none');
            $('.contacts-top-menu').addClass('d-none');
            $('.dropdown.languages').addClass('d-none');
            $('.logo-lang-and-btn-menu').addClass('background-active');
        } else {
            $('.btn-resa-menu-contain').addClass('d-none');
            $('.logo-top').removeClass('d-none');
            $('.contacts-top-menu').removeClass('d-none');
            $('.dropdown.languages').removeClass('d-none');
            $('.logo-lang-and-btn-menu').removeClass('background-active');
        }
    });

    // ****** Sous-menu
    $('.clic-sub-menu').on('click', function () {
        if ($(this).children('.sub-menu').hasClass('sub-menu-active')) {
            $('.clic-sub-menu .sub-menu').removeClass('sub-menu-active');
        } else {
            $('.clic-sub-menu .sub-menu').removeClass('sub-menu-active');
            $(this).children('.sub-menu').addClass('sub-menu-active');
        }
    });

    // ****** Sous-menu langues
    $('.languages').on('click', function () {
        if ($(this).children('.dropdown-menu').hasClass('dropdown-menu-active')) {
            $('.languages .dropdown-menu').removeClass('dropdown-menu-active');
        } else {
            $('.languages .dropdown-menu').removeClass('dropdown-menu-active');
            $(this).children('.dropdown-menu').addClass('dropdown-menu-active');
        }
    });

    // ****** Pour couleur link menu gardée: ajoute ou enlève la classe
    document.querySelectorAll('.clic-sub-menu').forEach((item) => {
        item.addEventListener('click', function () {
            this.classList.toggle('active-parent');
        });
    });

    // Texte presentation page Home
    if ($(".description").length > 0) {
        var $description = $(".description");
        var $seeMore2 = $("#seeMore2");
        var $seeLess2 = $("#seeLess2");

        // Check si le texte est limité, on affiche pas les boutons
        if ($description[0].scrollHeight <= $description.height()) {
            $seeMore2.hide();
            $seeLess2.hide();
        } else {
            $seeMore2.show();
            $seeLess2.hide();
        }

        // Voir plus presentation
        $seeMore2.on('click', function (e) {
            e.preventDefault();
            $description.css('height', 'auto').addClass("expanded");
            $seeMore2.hide();
            $seeLess2.show();
        });

        // Voir moins presentation
        $seeLess2.on('click', function (e) {
            e.preventDefault();
            $description.css('height', 'auto').removeClass("expanded");
            $seeMore2.show();
            $seeLess2.hide();
        });
    };

    // ****** Météo: applique l'image de fond correspondante
    $('.weather-icon').each(function () {
        var weatherIcon = $(this).attr('data');
        var $meteoModule = $(this).closest('.meteo-module');
        var baseUrl = $meteoModule.data('url');

        // Vérifie si weatherIcon est défini et non vide
        if (weatherIcon && weatherIcon.trim() !== '') {
            var iconPath = baseUrl + weatherIcon + '.jpg';

            // Ajoute une classe basée sur l'icône météo
            $meteoModule.addClass('weather-' + weatherIcon);
        } else {
            // Image par défaut si aucune icône n'est trouvée
            var iconPath = baseUrl + 'clear-day.jpg';

            // Ajoute une classe par défaut si souhaité
            $meteoModule.addClass('weather-clear-day');
        }

        // Applique l'image de fond
        $meteoModule.css({
            'background-image': 'url(' + iconPath + ')',
            'background-size': 'cover'
        });
    });

    // ****** SCEA + / -
    // Voir plus SCEA
    $(".options-scea").hide();
    $(".options-scea").slice(0, 10).show();

    $("#seeMore1").on('click', function (e) {
        e.preventDefault();

        $(".options-scea:hidden").slideDown();

        $("#seeMore1").hide();
        $("#seeLess1").show();
    });

    // Voir moins SCEA
    $("#seeLess1").on('click', function (e) {
        e.preventDefault();

        $(".options-scea").not(":lt(10)").slideUp();

        $("#seeMore1").show();
        $("#seeLess1").hide();
    });

    // ****** Déchenchement effet sur les titles
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const title = entry.target;

            if (entry.isIntersecting && !title.classList.contains('animated')) {
                // Ajoute l'animation la première fois qu'on voit le titre
                title.classList.add(title.dataset.animClass, 'animated');
                title.classList.remove('hidden-title');

                // Stoppe l'observation après la première animation
                observer.unobserve(title);
            }
        });
    }, observerOptions);

    // Sélectionne les titres et ajoute l'observateur
    const titles = document.querySelectorAll('.hidden-title');
    titles.forEach(title => {
        if (title.classList.contains('big-title')) {
            title.dataset.animClass = 'line-up-title';
        }
        observer.observe(title);
    });

    // ****** Clics sur les liens des prix chèques cadeaux
    $('.all-prices-vouchers .btn-contain').on('click', function (event) {
        event.preventDefault();

        // Trouver le lien à l'intérieur de btn-contain
        var linkElement = $(this).find('.voucher-link');
        
        var targetId = $(this).attr('id');

        if (linkElement.length) {
            var targetId = linkElement.attr('id');

            // Trouver l'élément correspondant dans le slider
            var targetElement = $(targetId);
            if (targetElement.length) {
                var index = $('.vouchers-slider').find('.owl-item').filter(function () {
                    return $(this).find(targetId).length > 0;
                }).index();

                // Si un index valide est trouvé, déplacer le slider
                if (index !== -1) {
                    $('.vouchers-slider').trigger('to.owl.carousel', [index, 600]);
                } else {
                    console.error("Impossible de trouver l'index dans Owl Carousel pour :", targetId);
                }
            } else {
                console.error("Cible non trouvée pour :", targetId);
            }
        } else {
            console.error("Aucun lien trouvé dans le bouton cliqué.");
        }
    });
});

$(document).ready(function () {
    $('.home-slider_img').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: true,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        margin: 10,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
            768: {
                items: 2,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
            1024: {
                items: 3,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
            1220: {
                items: 3,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
        }
    });
    $('.avis-slider').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        margin: 20,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            768: {
                items: 1,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1024: {
                items: 2,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1220: {
                items: 2,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
        }
    });
    $('.slider-others-pages').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: true,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        margin: 20,
        autoWidth: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
            768: {
                items: 2,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
            1024: {
                items: 3,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: false,

            },
            1220: {
                items: 4,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
        }
    });
    $('.slider-page-page').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: true,
        items: 1,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        margin: 20,
        responsiveClass: true,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
            768: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
            1024: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
        }
    });
    $('.detail-slider_img').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: true,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        margin: 0,
        items: 1,
        responsiveClass: true,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
            768: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
            1024: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
        }
    });
    $('.vouchers-slider').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: ["<i class='las la-angle-left'></i>", "<i class='las la-angle-right'></i>"],
        margin: 20,
        items: 1,
        autoHeight: true,
        responsiveClass: true,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
            768: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
            1024: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
        }
    });
});