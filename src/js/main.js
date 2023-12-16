/* global d3 */
import debounce from 'lodash.debounce';
import isMobile from './utils/is-mobile';
import linkFix from './utils/link-fix';
import modalSetup from './utils/modal-a11y';
import graphic from './graphic';
import footer from './footer';
import Svelte from 'svelte';
import scrollama from 'scrollama';

const $body = d3.select('body');
let previousWidth = 0;

function resize() {
  const width = $body.node().offsetWidth;
  if (previousWidth !== width) {
    previousWidth = width;
    graphic.resize();
  }
}

function setupStickyHeader() {
  const $header = $body.select('header');
  if ($header.classed('is-sticky')) {
    const $menu = $body.select('#slide__menu');
    const $toggle = $body.select('.header__toggle');

    modalSetup($toggle, $toggle, $header, $menu, 'a, button, .logo', true);
  }
}

function init() {
  linkFix();
  $body.classed('is-mobile', isMobile.any());
  window.addEventListener('resize', debounce(resize, 150));
  setupStickyHeader();
  graphic.init();
  footer.init();

  // Scrollama setup
  document.addEventListener('DOMContentLoaded', () => {
    const scroller = scrollama();

    function handleStepEnter(response) {
      response.element.classList.add('is-active');
    }

    scroller.setup({
      step: '.step',
      offset: 0.5,
      debug: false,
    }).onStepEnter(handleStepEnter);

    window.addEventListener('resize', scroller.resize);
  });
}

init();
