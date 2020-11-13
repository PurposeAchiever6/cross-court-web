import { history } from 'shared/history';
import ReactGA from 'react-ga';

const setScrollClasses = () => {
  const header = document.querySelector('.header');
  const mobile = window.innerWidth < 992;
  const headerScrollLimit = mobile ? 50 : 50; //800;

  if (body.getAttribute('data-page') === 'home') {
    const bigTitle = document.querySelector('.crosscourt-big-title');

    if (bigTitle) {
      let addClass = '';
      let animClasses = [
        'anim1',
        'anim2',
        'anim3',
        'anim4',
        'anim5',
        'anim6',
        'anim7',
        'anim8',
        'anim9',
        'anim10',
        'anim11',
        'anim12',
        'anim13',
        'anim14',
        'anim15',
        'anim16',
        'anim17',
        'anim18',
        'anim19',
        'anim20',
      ];

      if (window.scrollY < 100) {
      } else if (window.scrollY >= 100 && window.scrollY < 130) {
        addClass = 'anim1';
      } else if (window.scrollY >= 130 && window.scrollY < 160) {
        addClass = 'anim2';
      } else if (window.scrollY >= 160 && window.scrollY < 190) {
        addClass = 'anim3';
      } else if (window.scrollY >= 190 && window.scrollY < 210) {
        addClass = 'anim4';
      } else if (window.scrollY >= 210 && window.scrollY < 240) {
        addClass = 'anim5';
      } else if (window.scrollY >= 240 && window.scrollY < 270) {
        addClass = 'anim6';
      } else if (window.scrollY >= 270 && window.scrollY < 300) {
        addClass = 'anim7';
      } else if (window.scrollY >= 300 && window.scrollY < 330) {
        addClass = 'anim8';
      } else if (window.scrollY >= 330 && window.scrollY < 360) {
        addClass = 'anim9';
      } else if (window.scrollY >= 360 && window.scrollY < 390) {
        addClass = 'anim10';
      } else if (window.scrollY >= 390 && window.scrollY < 420) {
        addClass = 'anim11';
      } else if (window.scrollY >= 420 && window.scrollY < 450) {
        addClass = 'anim12';
      } else if (window.scrollY >= 450 && window.scrollY < 480) {
        addClass = 'anim13';
      } else if (window.scrollY >= 480 && window.scrollY < 510) {
        addClass = 'anim14';
      } else if (window.scrollY >= 510 && window.scrollY < 540) {
        addClass = 'anim15';
      } else if (window.scrollY >= 540 && window.scrollY < 570) {
        addClass = 'anim16';
      } else if (window.scrollY >= 570 && window.scrollY < 600) {
        addClass = 'anim17';
      } else if (window.scrollY >= 600 && window.scrollY < 630) {
        addClass = 'anim18';
      } else if (window.scrollY >= 630 && window.scrollY < 660) {
        addClass = 'anim19';
      } else if (window.scrollY >= 660 && window.scrollY < 690) {
        addClass = 'anim20';
      } else if (window.scrollY >= 690) {
      }

      if (addClass) {
        bigTitle.classList.add(addClass);
      }
      bigTitle.classList.remove(...animClasses.filter(item => item !== addClass));
    }
  } else if (body.getAttribute('data-page') === 'free-session-credit-added') {
    const bigTitle = document.querySelector('.free-session-credit-added .title');

    if (bigTitle && keepScrolling) {
      let addClass = '';
      let animClasses = [
        'anim1',
        'anim2',
        'anim3',
        'anim4',
        'anim5',
        'anim6',
        'anim7',
        'anim8',
        'anim9',
        'anim10',
        'anim11',
        'anim12',
        'anim13',
        'anim14',
        'anim15',
        'anim16',
        'anim17',
        'anim18',
        'anim19',
        'anim20',
        'anim21',
        'anim22',
        'anim23',
        'anim24',
        'anim25',
        'anim26',
        'anim27',
        'anim28',
        'anim29',
        'anim30',
      ];
      document.querySelector('.locations').classList.add('faded-out');

      if (window.scrollY < 20) {
      } else if (window.scrollY >= 20 && window.scrollY < 40) {
        addClass = 'anim1';
      } else if (window.scrollY >= 40 && window.scrollY < 60) {
        addClass = 'anim2';
      } else if (window.scrollY >= 60 && window.scrollY < 80) {
        addClass = 'anim3';
      } else if (window.scrollY >= 80 && window.scrollY < 100) {
        addClass = 'anim4';
      } else if (window.scrollY >= 100 && window.scrollY < 120) {
        addClass = 'anim5';
      } else if (window.scrollY >= 120 && window.scrollY < 140) {
        addClass = 'anim6';
      } else if (window.scrollY >= 140 && window.scrollY < 160) {
        addClass = 'anim7';
      } else if (window.scrollY >= 160 && window.scrollY < 180) {
        addClass = 'anim8';
      } else if (window.scrollY >= 180 && window.scrollY < 200) {
        addClass = 'anim9';
      } else if (window.scrollY >= 200 && window.scrollY < 220) {
        addClass = 'anim10';
      } else if (window.scrollY >= 220 && window.scrollY < 240) {
        addClass = 'anim11';
      } else if (window.scrollY >= 240 && window.scrollY < 260) {
        addClass = 'anim12';
      } else if (window.scrollY >= 260 && window.scrollY < 280) {
        addClass = 'anim13';
      } else if (window.scrollY >= 280 && window.scrollY < 300) {
        addClass = 'anim14';
      } else if (window.scrollY >= 300 && window.scrollY < 320) {
        addClass = 'anim15';
      } else if (window.scrollY >= 320 && window.scrollY < 340) {
        addClass = 'anim16';
      } else if (window.scrollY >= 340 && window.scrollY < 360) {
        addClass = 'anim17';
      } else if (window.scrollY >= 360 && window.scrollY < 380) {
        addClass = 'anim18';
      } else if (window.scrollY >= 380 && window.scrollY < 400) {
        addClass = 'anim19';
      } else if (window.scrollY >= 400 && window.scrollY < 420) {
        addClass = 'anim20';
      } else if (window.scrollY >= 420 && window.scrollY < 440) {
        addClass = 'anim21';
      } else if (window.scrollY >= 440 && window.scrollY < 460) {
        addClass = 'anim22';
      } else if (window.scrollY >= 460 && window.scrollY < 480) {
        addClass = 'anim23';
      } else if (window.scrollY >= 480 && window.scrollY < 500) {
        addClass = 'anim24';
      } else if (window.scrollY >= 500 && window.scrollY < 520) {
        addClass = 'anim25';
      } else if (window.scrollY >= 520 && window.scrollY < 540) {
        addClass = 'anim26';
      } else if (window.scrollY >= 540 && window.scrollY < 560) {
        addClass = 'anim27';
      } else if (window.scrollY >= 560 && window.scrollY < 580) {
        addClass = 'anim28';
      } else if (window.scrollY >= 580 && window.scrollY < 600) {
        addClass = 'anim29';
      } else if (window.scrollY >= 600) {
        addClass = 'anim30';
        keepScrolling = false;
        document.querySelector('main').classList.add('animation-done');
        document.querySelector('.locations').scrollIntoView({ behavior: 'smooth' });
        window.setTimeout(function() {
          document.querySelector('.locations').classList.remove('faded-out');
          header.classList.add('scrolled');
          window.setTimeout(function() {
            if (document.querySelector('.free-session-credit-added')) {
              document.querySelector('.free-session-credit-added').style.display = 'none';
            }
          }, 800);
        }, 1000);
      }

      if (addClass) {
        bigTitle.classList.add(addClass);
      }
      bigTitle.classList.remove(...animClasses.filter(item => item !== addClass));
    }
  } else if (body.getAttribute('data-page') === 'no-session-credits') {
    const bigTitle = document.querySelector('.no-session-credits .title');

    if (bigTitle && keepScrolling) {
      let addClass = '';
      let animClasses = [
        'anim1',
        'anim2',
        'anim3',
        'anim4',
        'anim5',
        'anim6',
        'anim7',
        'anim8',
        'anim9',
        'anim10',
        'anim11',
        'anim12',
        'anim13',
        'anim14',
        'anim15',
        'anim16',
        'anim17',
        'anim18',
        'anim19',
        'anim20',
        'anim21',
        'anim22',
        'anim23',
        'anim24',
        'anim25',
        'anim26',
        'anim27',
        'anim28',
        'anim29',
        'anim30',
      ];
      document.querySelector('.series-plans-container').classList.add('faded-out');
      document.querySelector('.series-series-container').classList.add('faded-out');

      if (window.scrollY < 20) {
      } else if (window.scrollY >= 20 && window.scrollY < 40) {
        addClass = 'anim1';
      } else if (window.scrollY >= 40 && window.scrollY < 60) {
        addClass = 'anim2';
      } else if (window.scrollY >= 60 && window.scrollY < 80) {
        addClass = 'anim3';
      } else if (window.scrollY >= 80 && window.scrollY < 100) {
        addClass = 'anim4';
      } else if (window.scrollY >= 100 && window.scrollY < 120) {
        addClass = 'anim5';
      } else if (window.scrollY >= 120 && window.scrollY < 140) {
        addClass = 'anim6';
      } else if (window.scrollY >= 140 && window.scrollY < 160) {
        addClass = 'anim7';
      } else if (window.scrollY >= 160 && window.scrollY < 180) {
        addClass = 'anim8';
      } else if (window.scrollY >= 180 && window.scrollY < 200) {
        addClass = 'anim9';
      } else if (window.scrollY >= 200 && window.scrollY < 220) {
        addClass = 'anim10';
      } else if (window.scrollY >= 220 && window.scrollY < 240) {
        addClass = 'anim11';
      } else if (window.scrollY >= 240 && window.scrollY < 260) {
        addClass = 'anim12';
      } else if (window.scrollY >= 260 && window.scrollY < 280) {
        addClass = 'anim13';
      } else if (window.scrollY >= 280 && window.scrollY < 300) {
        addClass = 'anim14';
      } else if (window.scrollY >= 300 && window.scrollY < 320) {
        addClass = 'anim15';
      } else if (window.scrollY >= 320 && window.scrollY < 340) {
        addClass = 'anim16';
      } else if (window.scrollY >= 340 && window.scrollY < 360) {
        addClass = 'anim17';
      } else if (window.scrollY >= 360 && window.scrollY < 380) {
        addClass = 'anim18';
      } else if (window.scrollY >= 380 && window.scrollY < 400) {
        addClass = 'anim19';
      } else if (window.scrollY >= 400 && window.scrollY < 420) {
        addClass = 'anim20';
      } else if (window.scrollY >= 420 && window.scrollY < 440) {
        addClass = 'anim21';
      } else if (window.scrollY >= 440 && window.scrollY < 460) {
        addClass = 'anim22';
      } else if (window.scrollY >= 460 && window.scrollY < 480) {
        addClass = 'anim23';
      } else if (window.scrollY >= 480 && window.scrollY < 500) {
        addClass = 'anim24';
      } else if (window.scrollY >= 500 && window.scrollY < 520) {
        addClass = 'anim25';
      } else if (window.scrollY >= 520 && window.scrollY < 540) {
        addClass = 'anim26';
      } else if (window.scrollY >= 540 && window.scrollY < 560) {
        addClass = 'anim27';
      } else if (window.scrollY >= 560 && window.scrollY < 580) {
        addClass = 'anim28';
      } else if (window.scrollY >= 580 && window.scrollY < 600) {
        addClass = 'anim29';
      } else if (window.scrollY >= 600) {
        addClass = 'anim30';
        keepScrolling = false;
        document.querySelector('main').classList.add('animation-done');
        document.querySelector('.series-plans-container').scrollIntoView({ behavior: 'smooth' });

        window.setTimeout(function() {
          document.querySelector('.series-plans-container').classList.remove('faded-out');
          document.querySelector('.series-series-container').classList.remove('faded-out');
          header.classList.add('scrolled');
          window.setTimeout(function() {
            if (document.querySelector('.no-session-credits')) {
              document.querySelector('.no-session-credits').style.display = 'none';
            }
          }, 800);
        }, 1000);
      }

      if (addClass) {
        bigTitle.classList.add(addClass);
      }
      bigTitle.classList.remove(...animClasses.filter(item => item !== addClass));
    }
  }

  if (
    body.getAttribute('data-page') === 'home' ||
    body.getAttribute('data-page') === 'how-it-works'
  ) {
    if (window.scrollY > headerScrollLimit) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    window.setTimeout(function() {
      const video = document.querySelector('.video-player');

      if (video) {
        video.addEventListener('pause', function() {
          video.classList.add('data-user-paused');
        });

        const options = {
          rootMargin: '0px',
          threshold: 0,
        };

        function callback(entries, observer) {
          entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
              if (!video.classList.contains('data-user-paused')) {
                video.play();
              }
            } else {
              video.pause();
              video.classList.remove('data-user-paused');
            }
          });
        }

        window.observer = new IntersectionObserver(callback, options);
        window.observer.observe(document.querySelector('.video-player'));
      }
    }, 2000);
  } else if (
    (body.getAttribute('data-page') === 'free-session-credit-added' && keepScrolling) ||
    (body.getAttribute('data-page') === 'locations' && keepScrolling)
  ) {
    header.classList.remove('scrolled');
  } else if (
    (body.getAttribute('data-page') === 'no-session-credits' && keepScrolling) ||
    (body.getAttribute('data-page') === 'no-session-credits' && keepScrolling) ||
    (body.getAttribute('data-page') === 'series' && keepScrolling)
  ) {
    header.classList.remove('scrolled');
  } else {
    header.classList.add('scrolled');

    if (window.observer) {
      window.observer.disconnect();
    }
  }

  window.setTimeout(function() {
    const bottomBanner = document.querySelector('.banner-container');

    if (body.getAttribute('data-page') === 'how-it-works') {
      const seeScheduleButton = document.querySelector('.see-schedule-button');

      if (
        seeScheduleButton &&
        !seeScheduleButton.classList.contains('done') &&
        window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 400
      ) {
        seeScheduleButton.classList.add(
          'animate__animated',
          'animate__bounce',
          'animate__slower',
          'animate__bounceInLeft',
          'done'
        );
      }
    }

    if (bottomBanner) {
      if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 200) {
        bottomBanner.classList.add('scrolled-down');
      } else {
        bottomBanner.classList.remove('scrolled-down');
      }
    }
  }, 100);
};

const { body } = document;
let keepScrolling = true;

window.setPageNameOnBodyClass = function(pathname) {
  let pageName = '';

  if (pathname === '/') {
    pageName = 'home';
  } else {
    pageName = pathname.replace(/\//g, '-').replace(/^-/, '');
  }

  body.setAttribute('data-page', pageName);

  if (window.sessionStorage.getItem('currentPage') !== pageName) {
    window.sessionStorage.setItem('previousPage', window.sessionStorage.getItem('currentPage'));
    window.sessionStorage.setItem('currentPage', pageName);
  }
};

history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page

  document.querySelector('main').classList.remove('animation-done');
  window.setPageNameOnBodyClass(window.location.pathname);
  keepScrolling = true;
  window.addEventListener('scroll', setScrollClasses);
  window.setTimeout(setScrollClasses, 1000);
});

window.setPageNameOnBodyClass(window.location.pathname);
window.addEventListener('scroll', setScrollClasses);
window.setTimeout(setScrollClasses, 1000);
