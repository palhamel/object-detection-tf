// function to draw rectangle on canvas/image:

// detections = object detected (obj)

export const drawRect = (detectedObject, ctx) => {
  // console.log(detections, ctx)

  detectedObject.forEach((prediction) => {
    // Get detected results:
    const [x, y, width, height] = prediction['bbox']
    const text = prediction['class']

    // Set styling:
    const color = 'red'
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
