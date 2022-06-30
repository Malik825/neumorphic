function bodyScrollingToggle() {
    document.body.classList.toggle('hidden-scrolling');
}
(() => {
    const filterContainer = document.querySelector(".portfolio-filter"),
        portfolioItemsContainer = document.querySelector('.portfolio-items'),
        portfolioItems = document.querySelectorAll('.portfolio-item'),
        popup = document.querySelector('.portfolio-popup'),
        prevBtn = popup.querySelector('.pp-prev'),
        nextBtn = popup.querySelector('.pp-next'),
        clostBtn = popup.querySelector('.pp-close'),
        projectDetailsContainer = popup.querySelector('.pp-details'),
        projectdetailsBtn = popup.querySelector('.pp-project-details-btn');
    let itemIndex, slideIndex, screenshots;

    // filter portfolio items,

    filterContainer.addEventListener('click', (event) => {
        // document.querySelector('.toggler').classList.toggle('none')
        // document.querySelector('.switch').classList.toggle('none')
        if (event.target.classList.contains('filter-item') && !event.target.classList.contains('active')) {
            //  deactivate existing active filter-item
            filterContainer.querySelector('.active').classList.remove('outer-shadow', 'active');
            // activate new "+ g ":L<O

            event.target.classList.add('active', 'outer-shadow');
            // console.log(targetItem)
            const targetItem = event.target.getAttribute('data-target');
            // console.log(targetItem)
            portfolioItems.forEach((item) => {
                // console.log(item.getAttribute('data-category'))
                if (targetItem === item.getAttribute('data-category') || targetItem === 'all') {
                    item.classList.remove("hide");
                    item.classList.add("show");
                } else {
                    item.classList.remove('show');
                    item.classList.add('hide')
                }
            })
        }
    })


    portfolioItemsContainer.addEventListener('click', (event) => {
        if (event.target.closest('.portfolio-item-inner')) {
            const portfolioItem = event.target.closest('.portfolio-item-inner').parentElement;
            // get the portfolioItem index
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenshots = portfolioItems[itemIndex].querySelector('.portfolio-item-img img').getAttribute("data-screenshort");
            // console.log(screenshots )
            // convert screenshots into array

            screenshots = screenshots.split(",");
            if (screenshots.length === 1) {
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            } else {
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            }
            // console.log(screenshots)
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }
    })
    clostBtn.addEventListener('click', () => {
        popupToggle()
        if (projectDetailsContainer.classList.contains("active")) {
            popupDetailsToggle()
        }
    })

    function popupToggle() {
        popup.classList.toggle('open')
        bodyScrollingToggle();
    }

    function popupSlideshow() {
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector('.pp-img');
        // activate loader untile popuImg is loaded
        popup.querySelector('.pp-loader').classList.add('active');
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            // deactivate loader
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        popup.querySelector('.pp-counter').innerHTML = (slideIndex + 1) + " of " + screenshots.length;
    }

    nextBtn.addEventListener('click', () => {
        if (slideIndex == screenshots.length - 1) {
            slideIndex = 0;
        } else {
            slideIndex++;
        }

        popupSlideshow();
        console.log("slideIndex" + slideIndex);
    })
    prevBtn.addEventListener('click', () => {
        if (slideIndex == 0) {
            slideIndex = screenshots.length - 1;
        } else {
            slideIndex--;
        }
        popupSlideshow();
        console.log('slideIndex' + slideIndex)
    })

    function popupDetails() {
        if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")) {
            projectdetailsBtn.style.display = "none";
            return; // end function execustion
        }
        projectdetailsBtn.style.display = "block";
        // get the project details 
        const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
        // set project details
        popup.querySelector(".pp-project-details").innerHTML = details;
        // get the project title
        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
        // st the project details
        popup.querySelector(".pp-title h2").innerHTML = title;
        // get the project category
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        // set the project category
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ")
    }
    projectdetailsBtn.addEventListener('click', () => {
        popupDetailsToggle()
    })

    function popupDetailsToggle() {
        if (projectDetailsContainer.classList.contains("active")) {
            projectdetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectdetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px";

        } else {

            projectdetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectdetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0, projectDetailsContainer.offsetTop)
        }
    }

})();

(() => {
    'use strict';
    const resume = document.querySelector('.profile'),
        tabsWrapper = document.querySelector('.about-tabs');

    const aboutTabs = document.querySelectorAll('.tab-item');
    aboutTabs.forEach(tab => tab.addEventListener('click', e => {

        if (tab.classList.contains('tab-item') && !tab.classList.contains('active')) {
            const targetItem = tab.getAttribute('data-target');
            tabsWrapper.querySelector('.active').classList.remove('active');
            tab.classList.add('active');

            resume.querySelector('.resumeBox.active').classList.remove('active');
            resume.querySelector(targetItem).classList.add('active')
        }
    }))
})();
let tab2 = document.querySelector('.tab2');
for (i = 0; i < 100; i++) {

    document.querySelector('.skill_bar').classList.remove('animate');
    tab2.addEventListener('click', e => {

        document.querySelectorAll('.skill_bar').forEach(skill => {
            skill.classList.add('animate');
        })

    })
}
tab2.addEventListener('mouseleave', e => {
    setTimeout((e) => {
        document.querySelectorAll('.skill_bar').forEach(skill => {
            skill.classList.remove('animate');
        }, 2000)
    })

})

let switchHandler = document.querySelector(".switch");
let switchIcon = document.querySelector(".fa-moon");
let firstTheme = localStorage.getItem("dark");
changeTheme(+firstTheme);

function changeTheme(isDark) {
    if (isDark) {
        document.body.classList.toggle("dark");
        switchIcon.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("dark", 1);
    } else {
        document.body.classList.remove("dark");
        switchIcon.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("dark", 0);
    }
}

switchHandler.addEventListener("click", e => {
    e.preventDefault();
    changeTheme(!document.querySelector("body").classList.contains("dark"));
});
var typed = new Typed('.text', {
    strings: ["<span>Designer</span>", "<span  class='primary-color'>Student</span>", "<span>Programmer</span>", "<span>Web Addict.</span>"],
    typeSpeed: 50,
    backSpeed: 40,
    loop: true
});

(() => {
    const sliderContainer = document.querySelector(".testi-slider-container"),
        slides = sliderContainer.querySelectorAll(".testi-item"),
        activeSlide = document.querySelector(".testi-item.active"),
        slideWidth = sliderContainer.offsetWidth,
        prevBtn = document.querySelector(".testi-slider-nav .prev"),
        nextBtn = document.querySelector(".testi-slider-nav .next");
    // let slideIndex = 0;
    let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);

    // set slides width for all slides
    slides.forEach((slide) => {
            // console.log(slide)
            slide.style.width = slideWidth + "px";
        })
        // set width of sliderContainer
        // sliderContainer.style.width = "1710px";
    sliderContainer.style.width = slideWidth * slides.length + "px"

    nextBtn.addEventListener('click', () => {
        if (slideIndex === slides.length - 1) {
            slideIndex = 0;
        } else {
            slideIndex++;
            sliderContainer.style.marginLeft = -(slideWidth * slideIndex) + "px";
        }

        slider();
    })


    prevBtn.addEventListener('click', () => {
        if (slideIndex === 0) {
            slideIndex = slides.length - 1;
        } else {
            slideIndex--;
            sliderContainer.style.marginLeft = -(slideWidth * slideIndex) + "px";

        }
        slider();
    })

    function slider() {
        // deactivate the existing active slide
        sliderContainer.querySelector(".testi-item.active").classList.remove("active");
        // activate new slide
        slides[slideIndex].classList.add("active");
        sliderContainer.style.marginLeft = -(slideWidth * slideIndex) + "px";
    }

    slider()
})();
let toggler = document.querySelector('.toggler');
let navigationOpen = document.querySelector('.leftSideBar');
let closeToggle = document.querySelector('.closeToggle');
let allLinks = document.querySelectorAll('ul li a');
allLinks.forEach((link) => link.addEventListener('click', e => {
    navigationOpen.classList.toggle('open')
    document.body.classList.remove('active');
    // toggler.classList.add('active')
}))
toggler.addEventListener('click', e => {
    navigationOpen.classList.add('open');
    // toggler.classList.toggle('active')
    document.body.classList.add('active');
})
closeToggle.addEventListener('click', e => {
    navigationOpen.classList.remove('open');
    // toggler.classList.toggle('active')
    document.body.classList.remove('active');
})
$(() => {

    $(this).on('scroll', e => {
        $('section').each(function(e) {
            console.log(e.target)
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let id = $(this).attr('id');
            let top = $(window).scrollTop();

            if (top > offset && top < offset + height) {
                $('.leftSideBar ul li a').removeClass('activeItem')
                $('.leftSideBar').find(`[href="#${id}"]`).addClass('activeItem');
            }

        });

    })

});