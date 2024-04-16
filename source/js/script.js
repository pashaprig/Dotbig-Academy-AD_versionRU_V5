// MENU

class App {
  init() {
    this.initMobileMenu();
    this.initSlider();
    this.afterVideoPlay();
    this.onButtonPlay();
    this.isPolicyChecked();
  }

  constructor() {
    this.iframe = document.querySelector('iframe');
    this.player = new Vimeo.Player(this.iframe);
    this.btnPlay = document.querySelector('#button-play')
  }

  initMobileMenu() {
    const navMain = document.querySelector('.main-nav');
    const navToggle = document.querySelector('.main-nav__toggle');
    const navButtonText = document.querySelector('.main-nav__open-btn-text');

    const initJS = () => {
      navMain.classList.remove('main-nav--nojs');
    }

    const closeOpen = () => {
      navToggle.addEventListener('click', function () {
        if (navMain.classList.contains('main-nav--closed')) {
          navMain.classList.remove('main-nav--closed');
          navMain.classList.add('main-nav--opened');
          navButtonText.classList.add('visually-hidden');
        } else {
          navMain.classList.add('main-nav--closed');
          navMain.classList.remove('main-nav--opened');
        }
      });
    }

    const linksClick = () => {
      const mainNav = document.querySelector('.main-nav');
      const links = mainNav.querySelectorAll('a');

      const navLinckHandleClick = () => {
        navMain.classList.add('main-nav--closed');
        navMain.classList.remove('main-nav--opened');
      }

      links.forEach(link => {
        link.addEventListener('click', navLinckHandleClick)
      })
    }

    initJS();
    closeOpen();
    linksClick();
  }

  initSlider() {
    $(function () {
      $('.slider').slick({
        arrows: false,
        slidesToShow: 3,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              dots: true,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              dots: true,
            }
          },
        ]
      });
    })
  }

  afterVideoPlay() {
    const vidoWrapper = document.querySelector('.promo__video')

    const onPlay = () => {
      vidoWrapper.style.borderRadius = 'unset';
      this.btnPlay.style.display = 'none'
    };

    this.player.on('play', onPlay);
  }

  onButtonPlay() {
    const playVideo = () => {
      this.player.play()
      this.btnPlay.style.display = 'none'
    }

    this.btnPlay.addEventListener('click', playVideo);
  }

  isPolicyChecked() {
    const leadform1 = document.querySelector('#leadform1');
    const leadform2 = document.querySelector('#leadform2');

    const isChecked = (form) => {
      const policyCheck = form.querySelector('[name="polycy"]')
      const termsCheck = form.querySelector('[name="terms"]')
      const sbmtBtn = form.querySelector('.submit_btn')


      const checkPolicy = () => {
        if (policyCheck.checked && termsCheck.checked) {
          sbmtBtn.removeAttribute("disabled");
        } else {
          sbmtBtn.setAttribute("disabled", "disabled");
        }
      };

      policyCheck.addEventListener('click', checkPolicy);
      termsCheck.addEventListener('click', checkPolicy);
    }

    [leadform1, leadform2].forEach((f) => { f.addEventListener('click', isChecked(f)) })
  }
}

const app = new App();
document.addEventListener('DOMContentLoaded', app.init());
