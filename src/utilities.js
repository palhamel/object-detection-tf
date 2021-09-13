// function to draw rectangle on canvas/image:

// detections = object detected (obj)

export const drawRect = (detectedObject, ctx) => {
  // console.log(detectedObject, ctx)
  console.log(detectedObject[0].class)
  // console.log(ctx)

  detectedObject.forEach((detection) => {
    // Get detected results:
    const [x, y, width, height] = detection['bbox']
    const text = detection['class']

    // Make if else around 'class' for different colors
    const classObject = detection.class

    // console.log(classObject)

    if (classObject === 'person') {
      
      // Set styling:
      const color = 'red'
      ctx.strokeStyle = color
      ctx.lineWidth = 3
      ctx.font = '24px Verdana'
      ctx.fillStyle = color
      ctx.textAlign = "start"
  
      // Draw rectangles and text:
      ctx.beginPath()
      ctx.fillText(text, x, y)
      ctx.rect(x, y, width, height)
      ctx.stroke()
      
    } else {

      // Set styling:
      const color = 'yellow'
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.font = '24px Arial'
      ctx.fillStyle = color
      ctx.textAlign = "start"
  
      // Draw rectangles and text:
      ctx.beginPath()
      ctx.fillText(text, x, y)
      ctx.rect(x, y, width, height)
      ctx.stroke()
      
    }
  })
}
