import {degrees} from './util'
import {Color} from './color'

const { cos, sin, PI } = Math
const TAU = PI * 2

export const element = document.querySelector('#game') as HTMLCanvasElement
export const ctx = element.getContext('2d')

export const width = element.width
export const height = element.height

// drawing
export function circle (x: number, y: number, radius: number, sides: number = 0) {
  ctx.beginPath()
  if (sides > 0) {
    for (let i = 0; i < sides; i++) {
      const theta = i / sides * TAU
      const ox = x + cos(theta) * radius
      const oy = y + sin(theta) * radius
      ctx.lineTo(ox, oy)
    }
  } else {
    ctx.arc(x, y, radius, 0, TAU)
  }
  ctx.fill()
}

export function fillTriangle (x: number, y: number, radius: number, color?: Color) {
  layer(() => {
    if (color) setFillColor(color)
    translate(x, y)
    rotate(-90)
    circle(0, 0, radius, 3)
  })
}

export function fillRect (x: number, y: number, width: number, height: number, color?: Color) {
  layer(() => {
    if (color) setFillColor(color)
    ctx.fillRect(x, y, width, height)
  })
}

export function strokeRect (x: number, y: number, width: number, height: number) {
  ctx.strokeRect(x, y, width, height)
}

export function fillText (text: string, x: number, y: number) {
  ctx.fillText(text, x, y)
}

export function clear (color: Color) {
  layer(() => {
    setFillColor(color)
    ctx.fillRect(0, 0, width, height)
  })
}

// graphics state
export function setFillColor (color: Color) {
  ctx.fillStyle = color.toString()
}

export function setStroke (color: Color, width: number) {
  ctx.strokeStyle = color.toString()
  ctx.lineWidth = width
}

export function setStrokeColor (color: Color) {
  ctx.strokeStyle = color.toString()
}

export function setShadow (ox: number, oy: number, blur: number, color: Color) {
  ctx.shadowOffsetX = ox
  ctx.shadowOffsetY = oy
  ctx.shadowBlur = blur
  ctx.shadowColor = color.toString()
}

export function setFont (font: string) {
  ctx.font = font
}

export function setTextAlign (align: string) {
  ctx.textAlign = align
}

// transformation
export function layer (drawops: Function, ...args) {
  ctx.save()
  drawops(...args)
  ctx.restore()
}

export function translate (x: number, y: number) {
  ctx.translate(x, y)
}

export function rotate (deg: number) {
  ctx.rotate(degrees(deg))
}

export function scale (sx: number, sy = sx) {
  ctx.scale(sx, sy)
}
