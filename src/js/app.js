"use strict";

import * as myFunctions from "./modules/functions.js";

myFunctions.isWebp();

//! scroll-top button
$(function () {
    $('#scroll-top').hide();
	$(window).scroll(function(){
		if($(window).scrollTop() > 100) {
			$('#scroll-top').show();
		} else {
			$('#scroll-top').hide();
		}
	});
 
	$('#scroll-top').click(function(){
		$('html, body').animate({scrollTop: 0}, 600);
		return false;
	});
});	

//! menu-burger 

const burgerMenu = document.querySelector('.menu__burger');
const menuBody = document.querySelector('.menu__body');
if (burgerMenu) {
	burgerMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('lock');
		burgerMenu.classList.toggle('active');
		menuBody.classList.toggle('active');
	});
}

//! scroll

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);	
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.menu').offsetHeight;

			if (burgerMenu.classList.contains('active')) {
				document.body.classList.remove('lock');
				burgerMenu.classList.remove('active');
				menuBody.classList.remove('active');
			} 

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}

//! popups

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

const timeout = 500;

let unlock = true;

if (popupLinks.length > 0) {
    for (let i = 0; i < popupLinks.length; i++) {
        const popupLink = popupLinks[i];
        popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const currentPopup = document.getElementById(popupName);
            popupOpen(currentPopup);
            e.preventDefault();
        }); 
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let i = 0; i < popupCloseIcon.length; i++) {
        const el = popupCloseIcon[i];
        el.addEventListener('click', function(e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        currentPopup.classList.add('open');
        currentPopup.addEventListener("click", function(e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}
function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}

function bodyLock () {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
        for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}
function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let i = 0; i < lockPadding.length; i++) {
                const el = lockPadding[i];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function() {
        unlock = true;
    }, timeout);
}
document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});

const langArr = {
    "doctitle" : {
        "ru" : "Амирхан Еники | Главная",
        "tat" : "Әмирхан Еники | Баш",
        "en" : "Amirkhan Eniki | Main",
    },
    "maintitle" : {
        "ru": "Амирхан Еники",
        "tat": "Әмирхан Еники",
        "en": "Amirkhan Eniki",
    },
    "subtitle" : {
        "ru": "Жизнь и творчество",
        "tat": "Тормыш hәм иҗат",
        "en": "Life and work",
    },
    "biolink" : {
        "ru" : "Кто это?",
        "tat" : "Кем ул?",
        "en" : "Who it?"
    },
    "textslink" : {
        "ru" : "Произведения",
        "tat": "Әсәрләр",
        "en": "Writings",
    },
    "journlink" : {
        "ru": "Публицистика",
        "tat": "Публицистика",
        "en": "Publicism",
    },
    "gallerylink" : {
        "ru": "Галерея",
        "tat": "Галерея",
        "en": "Gallery",
    },
    "biotitle" : {
        "ru": "<i class='far fa-question-circle'></i>&nbsp;Кто такой Амирхан Еники?",
        "tat": "<i class='far fa-question-circle'></i>&nbsp;Кем ул Әмирхан Еники?",
        "en": "<i class='far fa-question-circle'></i>&nbsp;Who is Amirkhan Eniki?",
    },
    "biotitle-1" : {
        "ru": "<i class='far fa-question-circle'></i>&nbsp;Биография Амирхана Еники",
        "tat": "<i class='far fa-question-circle'></i>&nbsp;Әмирхан Еникиның биографиясе",
        "en": "<i class='far fa-question-circle'></i>&nbsp;Biography of Amirkhan Eniki",
    },
    "textstitle" : {
        "ru": "<i class='fas fa-book'></i>&nbsp;Художественные произведения",
        "tat": "<i class='fas fa-book'></i>&nbsp;Әсәрләр",
        "en": "<i class='fas fa-book'></i>&nbsp;Writings",
    },
    "textstitle-1" : {
        "ru": "<i class='fas fa-book'></i>&nbsp;Художественные произведения Еники",
        "tat": "<i class='fas fa-book'></i>&nbsp;Еникиның әсәрләре",
        "en": "<i class='fas fa-book'></i>&nbsp;Eniki's writings",
    },
    "textstext" : {
        "ru": "",
        "tat": "",
        "en": "",
    },
    "journtitle" : {
        "ru": "<i class='far fa-newspaper'></i>&nbsp;Публицистика",
        "tat": "<i class='far fa-newspaper'></i>&nbsp;Публицистика",
        "en": "<i class='far fa-newspaper'></i>&nbsp;Publicism",
    },
    "journtext" : {
        "ru": "Вы можете скачать сборник публицистических рассказов А. Еники:",
        "tat": "Ә. Еникиның публицистик хикәяләре җыентыгын күчереп алырга мөмкин:",
        "en": "You can download the collection of publicistic writings by A. Eniki:",
    },
    "gallerytitle" : {
        "ru": "<i class='far fa-image'></i>&nbsp;Галерея",
        "tat": "<i class='far fa-image'></i>&nbsp;Галерея",
        "en": "<i class='far fa-image'></i>&nbsp;Gallery",
    },
    "gallerytext" : {
        "ru": "",
        "tat": "",
        "en": "",
    },
    "footertitle" : {
        "ru": "Сайт про жизнь и творчество<br>Амирхана Еники",
        "tat": "Әмирхан Еникиның<br>тормышы hәм иҗаты турында сайт",
        "en": "The website about the life and work<br>of Amirkhan Eniki",
    },
    "footertext" : {
        "ru": "По всем вопросам и предложениям можно обратиться сюда:",
        "tat": "Барлык сораулар hәм тәкъдимнәр буенча монда мөрәҗәгать итәргә мөмкин:",
        "en": "You can contact here for all questions and suggestions:",
    },
    "footertext-1" : {
        "ru": "<strong>&copy;</strong> Фотографии взяты с открытых источников и из личного архива А. Еники",
        "tat": "<strong>&copy;</strong> Фотолар ачык чыганаклардан hәм Ә. Еникиның шәхси архивыннан алынды",
        "en": "<strong>&copy;</strong> The photos are taken from open sources and from the personal archive of A. Eniki",
    },
    "download" : {
        "ru": "Скачать",
        "tat": "Йөкләргә",
        "en": "Download"
    },
    "download-1" : {
        "ru": "Скачать",
        "tat": "Йөкләргә",
        "en": "Download"
    },
}

//! change language
const select = document.querySelector('select');
const langs = ['ru', 'tat', 'en']

select.addEventListener('change', changeURLLanguage);

function changeURLLanguage() {
	let lang = select.value;
	location.href = window.location.pathname + '#'+lang;
	location.reload();
}

function changeLanguage() {
	let hash = window.location.hash;
	hash = hash.substr(1);
	if (!langs.includes(hash)) {
		location.href = window.location.pathname + '#ru';
		location.reload();
	}
	select.value = hash;
	document.querySelector('title').innerHTML = langArr['doctitle'][hash];

	for (let key in langArr) {
        let elem = document.querySelector('.lng-' + key);
        if (elem) {
            elem.innerHTML = langArr[key][hash];
        }
    }
}

changeLanguage();

//! lazy loading

const lazyImages = document.querySelectorAll('img[data-src], source[data-srcset]');
const windowHeight = document.documentElement.clientHeight;
const loadMoreBlock = document.querySelector('load-more');

let lazyImgsPos = [];
if (lazyImages.length > 0) {
    lazyImages.forEach(img => {
        if (img.dataset.src || img.dataset.srcset) {
            lazyImgsPos.push(img.getBoundingClientRect().top + pageYOffset);
            lazyScrollCheck();
        }
    });
}

window.addEventListener("scroll", lazyScroll);

function lazyScroll() {
    if (document.querySelectorAll('img[data-src], source[data-srcset]').length > 0) {
        lazyScrollCheck();
    }
    if (!loadMoreBlock.classList.contains('_loading')) {
        loadMore();
    }
}

function lazyScrollCheck() {
    let imgIndex = lazyImgsPos.findIndex(
        item => pageYOffset > item - windowHeight
    );
    if (imgIndex >= 0) {
        if (lazyImages[imgIndex].dataset.src) {
            lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
            lazyImages[imgIndex].removeAttribute('data-src');
        } else if (lazyImages[imgIndex].dataset.srcset) {
            lazyImages[imgIndex].srcset = lazyImages[imgIndex].dataset.srcset;
            lazyImages[imgIndex].removeAttribute('data-srcset');
        }
        delete lazyImgsPos[imgIndex];
    }
}

function loadMore() {
    const loadMoreBlockPos =  loadMoreBlock.getBoundingClientRect().top + pageYOffset;
    const loadMoreBlockHeight = loadMoreBlock.offsetHeight;

    if (pageYOffset > (loadMoreBlockPos + loadMoreBlockHeight) - windowHeight) {
        getContent();
    }
}

async function getContent() {
    if (!document.querySelector('_loading-icon')) {
       loadMoreBlock.insertAdjacentHTML(
           'beforeend',
            `<div class="_loading-icon"></div>`
       );
       loadMoreBlock.classList.add('_loading');

       let response = await fetch('_more.html', {
           method: 'GET',
       });
       if (response.ok) {
           let result = await response.text();
           loadMoreBlock.insertAdjacentHTML('beforeend', result);
           loadMoreBlock.classList.remove('_loading');
           if (document.querySelector('._loading-icon')) {
               document.querySelector('._loading-icon').remove();
           }
       } else {
           alert("Ошибка");
       }
    }
}