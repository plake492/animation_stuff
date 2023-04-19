import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export const init = () => {
  gsap.registerPlugin(ScrollTrigger)

  const cardWrapperEl = document.getElementById('card-wrapper')

  const largeImgEl = document.getElementById('large-img-paralax')

  const carouselContainerEl = document.getElementById('img-carousel-container')
  const carouselOneEl = document.getElementById('img-carousel-1')
  const carouselTwoEl = document.getElementById('img-carousel-2')

  const textWrapperEl = document.getElementById('text-wrapper')
  const textWrapperChildrenEl = [...textWrapperEl.children]

  const waterfallEl = document.getElementById('waterfall')
  const waterfallHorizontalTextEls = document.querySelectorAll(
    '.waterfall-text-horizontal'
  )
  const waterfallVerticalTextEls = document.querySelectorAll(
    '.waterfall-text-vertical'
  )
  const waterFallEls = [...waterfallEl.querySelectorAll('.falling')]
  const waterFallSidewaysEls = [...waterfallEl.querySelectorAll('.sideways')]

  const panelsWrapperEl = document.getElementById('panels')

  const pictureAmbushWrapperEl = document.getElementById('picture-ambush')
  const pictureAmbushChildren = [...pictureAmbushWrapperEl.children]

  /************************************************************
   *  CARD SECTION
   * */
  gsap.from(cardWrapperEl.children, {
    scrollTrigger: {
      trigger: cardWrapperEl,
      start: 'top bottom-=300',
      end: 'bottom bottom-=300'
    },

    stagger: 0.3,
    autoAlpha: 0,
    y: 10,
    x: -50
  })

  /************************************************************
   *  LARGE IMAGE
   * */
  gsap.from(largeImgEl, {
    scrollTrigger: {
      trigger: largeImgEl.parentElement,
      start: 'top bottom-=300',
      end: 'bottom bottom-=300'
    },
    duration: 1,
    y: 40,
    autoAlpha: 0
  })

  /************************************************************
   *  IMAGE CAROUSEL
   * */
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: carouselOneEl,
      invalidateOnRefresh: true,
      scrub: 4,
      start: 'top bottom-=100',
      end: () =>
        `bottom+=${
          carouselTwoEl.getBoundingClientRect().bottom -
          carouselOneEl.getBoundingClientRect().bottom
        } top+=100`
    }
  })

  tl.fromTo(carouselOneEl, { autoAlpha: 0.5 }, { autoAlpha: 1 }, 0)
  tl.fromTo(carouselTwoEl, { autoAlpha: 0.5 }, { autoAlpha: 1 }, 0)
  tl.to(
    carouselOneEl,
    { x: -(carouselOneEl.scrollWidth + 48 - window.innerWidth) },
    0
  )
  tl.to(
    carouselTwoEl,
    { x: carouselOneEl.scrollWidth + 48 - window.innerWidth },
    0
  )

  /********************************************************************************************************************
   *  TEXT APPEAR
   */

  textWrapperChildrenEl.forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top center',
        end: 'top center'
      },
      yPercent: 33,
      autoAlpha: 0
    })
  })

  /********************************************************************************************************************
   *  WATERFALL ANIMATION
   */

  const waterfallConfig = {
    stagger: {
      from: 'center',
      amount: 1
    }
  }
  const waterfallSidewaysConfig = {
    stagger: {
      from: 'edges',
      amount: 1
    }
  }

  gsap
    .timeline({
      duration: 1.75,
      scrollTrigger: {
        trigger: waterfallEl,
        start: 'top top',
        end: '+=300%',
        scrub: 2,
        pin: true
      }
    })
    .to(
      waterFallSidewaysEls.filter((el, i) => {
        return i % 2 !== 0
      }),
      { ...waterfallSidewaysConfig, xPercent: -100, autoAlpha: 0.25 },
      '0'
    )
    .to(
      waterFallSidewaysEls.filter((_, i) => i % 2 === 0),
      { ...waterfallSidewaysConfig, xPercent: 100, autoAlpha: 0.25 },
      '0'
    )
    .to(
      waterFallEls.filter((el, i) => {
        return i % 2 !== 0
      }),
      { ...waterfallConfig, yPercent: -100, autoAlpha: 0.5 },
      '<0.2'
    )
    .to(
      waterFallEls.filter((_, i) => i % 2 === 0),
      { ...waterfallConfig, yPercent: 100, autoAlpha: 0.5 },
      '<0.2'
    )
    .from(
      waterfallHorizontalTextEls[0],
      {
        autoAlpha: 0,
        xPercent: -200
      },
      '1.25'
    )
    .from(
      waterfallHorizontalTextEls[1],
      {
        autoAlpha: 0,
        xPercent: 200
      },
      '1.25'
    )
    .from(
      waterfallVerticalTextEls[0],
      {
        autoAlpha: 0,
        yPercent: 200
      },
      '1.25'
    )
    .from(
      waterfallVerticalTextEls[1],
      {
        autoAlpha: 0,
        yPercent: -200
      },
      '1.25'
    )
    .to(
      waterfallEl.querySelector('.img-wrapper'),
      { rotate: 45, scale: 0.5, autoAlpha: 0 },
      '+=0.5'
    )

  /********************************************************************************************************************
   *  PANELS
   */

  gsap
    .timeline({
      duration: 4,
      scrollTrigger: {
        trigger: panelsWrapperEl,
        pin: true,
        start: 'top top',
        end: '+=300%',
        scrub: 2,
        pin: true
      }
    })
    .from(panelsWrapperEl.children[1], { xPercent: 100 }, 0)
    .to(
      panelsWrapperEl.children[0].children[0],
      { autoAlpha: 0, yPercent: 50 },
      0
    )

    .from(panelsWrapperEl.children[2], { xPercent: 100 }, 1)
    .to(
      panelsWrapperEl.children[1].children[0],
      { autoAlpha: 0, yPercent: -100 },
      1
    )

    .from(panelsWrapperEl.children[3], { xPercent: 100 }, 2)
    .to(
      panelsWrapperEl.children[2].children[0],
      { autoAlpha: 0, yPercent: 100 },
      2
    )

    .to(
      panelsWrapperEl.children[3].children[0],
      { autoAlpha: 0, yPercent: -100 },
      3
    )

  /********************************************************************************************************************
   * PICTURE AMBUSH
   */
  pictureAmbushChildren.forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        scrub: 2
      },
      xPercent: i % 2 === 0 ? -100 : 100,
      autoAlpha: 0
    })
  })
}
