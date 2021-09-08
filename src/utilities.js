// function to draw rectangle on canvas/image:

// detections = object detected (obj)

export const drawRect = (detectedObject, ctx) => {
  // console.log(detectedObject, ctx)
  // console.log(detectedObject[0])
  console.log(ctx)

  detectedObject.forEach((detection) => {
    // Get detected results:
    const [x, y, width, height] = detection['bbox']
    const text = detection['class']

    // Make if else around 'class' for diffrent colors

    // Set styling:
    const color = 'red'
    ctx.strokeStyle = color
    ctx.lineWidth = 4
    ctx.font = '18px Arial'
    ctx.fillStyle = color
    ctx.textAlign = "end"

    // Draw rectangles and text:
    ctx.beginPath()
    ctx.fillText(text, x, y)
    ctx.rect(x, y, width, height)
    ctx.stroke()
  })
}
