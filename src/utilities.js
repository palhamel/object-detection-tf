// function to draw rectangle on canvas/image:

// detections = object detected (obj)

export const drawRect = (detections, ctx) => {
  // console.log(detections, ctx)

  detections.forEach((prediction) => {
    // Get detected results:
    const [x, y, width, height] = prediction['bbox']
    const text = prediction['class']

    // Set styling:
    const color = 'green'
    ctx.strokeStyle = color
    ctx.font = '18px Arial'
    ctx.fillStyle = color

    // Draw rectangles and text:
    ctx.beginPath()
    ctx.fillText(text, x, y)
    ctx.rect(x, y, width, height)
    ctx.stroke()
  })
}
