const __ROOT__ = document.getElementById('root')
const __CANVAS__ = document.createElement('canvas')
__CANVAS__.setAttribute('id', 'canvas')


;
(function init() {
  if (__CANVAS__.getContext) {
    __ROOT__.appendChild(__CANVAS__)
    __CANVAS__.classList.add('abs')
    // __CANVAS__.setAttribute('height', '400')
    const ctx = __CANVAS__.getContext('2d')
    // drawRect(ctx)
    // drawEdge(ctx, __ROOT__)
    drawAntRun(ctx, __CANVAS__)
  }
})()


function drawRect(ctx) {
  const x0 = 50,
    y0 = 50
  const x1 = 100,
    y1 = 95
  const x2 = 50,
    y2 = 140
  const ps = 4


  ctx.fillStyle = "rgb(200,0,0)"
  ctx.fillRect(x0 - ps / 2, y0 - ps / 2, ps, ps)

  ctx.fillStyle = "rgb(0, 0, 200)"
  ctx.fillRect(x1 - ps / 2, y1 - ps / 2, ps, ps)

  ctx.fillStyle = "rgb(0, 0, 200)"
  ctx.fillRect(x2 - ps / 2, y2 - ps / 2, ps, ps)


  ctx.beginPath()
  ctx.moveTo(x0, y0)
  ctx.arcTo(x1, y1, x2, y2, 60)
  ctx.stroke()

  ctx.beginPath()
  // ctx.moveTo(x0 / 2, y0)
  ctx.arc(x1 / 2 - 10, y1, 20, 0, 180 * (Math.PI / 180), false)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(x2, y2)
  ctx.quadraticCurveTo(x2 * 1.5, y2 * 1.5, 2 * x2, y2)
  ctx.quadraticCurveTo(x2 * 2.5, y2 * 0.5, 3 * x2, y2)
  ctx.stroke()
}

function drawEdge(ctx, el) {
  const W = el.offsetWidth
  const H = el.offsetHeight
  const padding = 10

  __CANVAS__.setAttribute('width', W)
  __CANVAS__.setAttribute('height', H)

  ctx.beginPath()
  ctx.lineWidth = 5
  ctx.lineJoin = 'bevel'
  ctx.moveTo(padding - ctx.lineWidth / 2, padding)
  ctx.lineTo(W - padding, padding)
  ctx.lineTo(W - padding, H - padding)
  ctx.lineTo(0 + padding, H - padding)
  ctx.closePath()

  window.requestAnimationFrame(() => {
    ctx.stroke()
  })
}

function drawAntRun(ctx, cvs, userOptions) {
  const defaultOptions = {
    lineWidth: 1,
    speedMultiplyer: 1,
    pattern: [4, 2],
  }

  const options = Object.assign(defaultOptions, userOptions)

  let offset = 0
  let start = performance.now()

  const W = cvs.offsetWidth
  const H = cvs.offsetHeight

  function draw() { 
    ctx.clearRect(0, 0, W, H)
    ctx.lineWidth = options.lineWidth
    ctx.lineJoin = 'round' 
    ctx.setLineDash(options.pattern); 
    ctx.lineDashOffset = -offset * options.speedMultiplyer; 
    const startPos = options.lineWidth / 2
    ctx.strokeRect(startPos, startPos, W - options.lineWidth, H - options.lineWidth);
  }

  function march() { 
    offset += (performance.now() - start) % 1; 
    if (offset >= W) {   
      offset = 0; 
    } 
    draw()
    window.requestAnimationFrame(march, () => {
      start = preformance.now()
    })
  }

  march()
}