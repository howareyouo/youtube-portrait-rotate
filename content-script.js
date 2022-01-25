var player, video, flexy,
    rbtn = document.createElement('a'),
    pbtn = document.createElement('a')
rbtn.innerHTML = '<svg viewBox="0 0 800 740"><path d="M426.38-.745a369.56 369.56 0 0 0-265.283 111.02l21.775 21.468C364.552-53.82 678.981 26.877 748.844 276.998c69.863 250.122-157.238 482.077-408.781 417.519C190.711 656.186 86.355 521.47 86.573 367.278v-12.574h53.67l-69.311-88.019-69.005 88.019h54.59v12.574c-2.124 285.421 305.526 466.108 553.77 325.237 248.243-140.871 250.898-497.647 4.779-642.197A370.793 370.793 0 0 0 426.38-.745z"/><path d="M214.46 487.805v30.669h184.012v-273.87H214.46v153.342h153.343v92.006zm30.669-122.674v-89.859h122.674v92.006zm368.023 153.036V244.604H429.14v273.87h184.012zm-153.343-30.668V275.272h122.674v214.68zm153.343-304.232h30.668v30.361h-30.668z"/></svg>'
rbtn.className = 'ytp-button ytp-rotate-button'
rbtn.title = 'Rotate 90° (r)'
rbtn.addEventListener('click', () => rotate())

pbtn.innerHTML = '<svg viewBox="0 0 1024 1024"><path d="M768 768V256a85.333333 85.333333 0 0 0-85.333333-85.333333H341.333333a85.333333 85.333333 0 0 0-85.333333 85.333333v512a85.333333 85.333333 0 0 0 85.333333 85.333333h341.333334a85.333333 85.333333 0 0 0 85.333333-85.333333z m128 0a42.666667 42.666667 0 0 0 42.666667-42.666667V298.666667a42.666667 42.666667 0 0 0-42.666667-42.666667h-42.666667v512zM128 256a42.666667 42.666667 0 0 0-42.666667 42.666667v426.666666a42.666667 42.666667 0 0 0 42.666667 42.666667h42.666667V256z"></path></svg>'
pbtn.className = 'ytp-button ytp-portrait-button'
pbtn.title = 'Portrait mode (q)'
pbtn.addEventListener('click', portrait)

function portrait () {
  if (!flexy) {
    flexy = document.querySelector('ytd-watch-flexy')
    flexy.isVerticalVideo = flexy.hasAttribute('is-vertical-video_')
  }
  if (flexy.hasAttribute('is-portrait-mode_')) {
    if (!flexy.isVerticalVideo) {
      flexy.setAttribute('is-four-three-to-sixteen-nine-video_', '')
      flexy.removeAttribute('is-vertical-video_')
    }
  } else {
    let wh = window.innerHeight - 169
    let vh = 1.7777777 * player.clientWidth
    flexy.style.setProperty('--ytd-portrait-height', Math.min(wh, vh) + 'px')
    flexy.removeAttribute('is-four-three-to-sixteen-nine-video_')
    flexy.setAttribute('is-vertical-video_', '')
  }
  flexy.toggleAttribute('is-portrait-mode_')
}

function rotate (resize, reset) {
  var height = player.clientHeight + 'px',
      width  = player.clientWidth + 'px',
      rotate = 0

  if (!reset) {
    rotate = Number.parseInt(player.style.getPropertyValue('--video-rotate')) || 0
    if (!resize) {
      rotate += 90
      rotate = rotate > 270 ? 0 : rotate
    }
    if (rotate / 90 % 2 != 0) {
      var wd = video.videoHeight - player.clientWidth
      var hd = video.videoWidth - player.clientHeight
      if (wd > hd) {
        height = player.clientWidth + 'px'
        width = 'auto'
      } else {
        width = player.clientHeight + 'px'
        height = 'auto'
      }
    }
  }
  player.style.setProperty('--video-rotate', rotate + 'deg')
  video.style.height = height
  video.style.width = width
}

var keyCodes = {a: 37, d: 39, w: 38, s: 40}
function keydown (e) {
  console.log(e)
  if (e.target.isContentEditable || e.target.tagName == 'INPUT' || e.ctrlKey) {
    return
  }
  var key = e.key.toLowerCase()
  switch (key) {
    case 'q':
      portrait()
      break
    case 'e':
      rotate(0, 1)
      break
    case 'r':
      rotate()
      break
    case 'a':
    case 'd':
    case 'w':
    case 's':
      player.dispatchEvent(new KeyboardEvent('keydown', {keyCode: keyCodes[key]}))
  }
}

var ctrls = document.querySelector('.ytp-right-controls')
if (ctrls) {
  ctrls.insertBefore(rbtn, ctrls.firstElementChild)
  ctrls.insertBefore(pbtn, ctrls.firstElementChild)
  player = document.querySelector('#movie_player')
  video = player.querySelector('video')
  video.addEventListener('loadstart', rotate)
  document.body.addEventListener('keydown', keydown)
  new ResizeObserver(() => {
    setTimeout(rotate, 50, 1)
  }).observe(player)
}
