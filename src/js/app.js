import * as myFunctions from "./modules/functions.js";

myFunctions.isWebp();

//! scroll-top button
$(function(){
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
            if (!e.target.closest('.popup__content  ')) {
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
        "ru": "&#9658; Кто такой Амирхан Еники?",
        "tat": "&#9658; Кем ул Әмирхан Еники?",
        "en": "&#9658; Who is Amirkhan Eniki?",
    },
    "textstitle" : {
        "ru": "&#9658; Произведения",
        "tat": "&#9658; Әсәрләр",
        "en": "&#9658; Writings",
    },
    "textstext" : {
        "ru": "",
        "tat": "",
        "en": "",
    },
    "journtitle" : {
        "ru": "&#9658; Публицистика",
        "tat": "&#9658; Публицистика",
        "en": "&#9658; Publicism",
    },
    "journtext" : {
        "ru": "&#9658;&nbsp;&nbsp;&nbsp;Вы можете скачать сборник публицистических рассказов А. Еники:",
        "tat": "&#9658;&nbsp;&nbsp;&nbsp;Ә. Еникиның публицистик хикәяләре җыентыгын күчереп алырга мөмкин:",
        "en": "&#9658;&nbsp;&nbsp;&nbsp;You can download the collection of publicistic writings by A. Eniki:",
    },
    "gallerytitle" : {
        "ru": "&#9658; Галерея",
        "tat": "&#9658; Галерея",
        "en": "&#9658; Gallery",
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
    }
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
