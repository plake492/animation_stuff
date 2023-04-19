import '../scss/index.scss'
import Particles from 'particlesjs'
import { init as initAnimations } from './animations'

const videoEL = (document.querySelector('.hero-video').playbackRate = 0.666)

window.onload = function () {
  Particles.init({
    selector: '.background',
    maxParticles: 200,
    color: '#dedede',
    connectParticles: false
  })
}

window.addEventListener('DOMContentLoaded', event => {
  initAnimations()
})

// ************************************************************************************************** //
// ************************************************************************************************** //
// ************************************************************************************************** //
// ************************************************************************************************** //
// ************************************************************************************************** //
