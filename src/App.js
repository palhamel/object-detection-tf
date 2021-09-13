// Import dependencies
// import React, { useRef, useState, useEffect } from 'react'
import React, { useRef, useEffect } from 'react'
// import * as tf from '@tensorflow/tfjs'
import '@tensorflow/tfjs'

//  Import required model:
import * as cocoSsd from '@tensorflow-models/coco-ssd'

// Import react-webcam:
import Webcam from 'react-webcam'

// Import styling:
import './App.css'

// Import drawing utility here:
import { drawRect } from './utilities'

function App() {
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)

  // ------------------------------------
  // NOTE: Still image capture:
  const [imgSrc, setImgSrc] = React.useState(null)

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 300,
      height: 220,
    })
    setImgSrc(imageSrc)
  }, [webcamRef, setImgSrc])
  // ------------------------------------

  // Main function
  const runCoco = async () => {
    // Load TF models
    const model = await cocoSsd.load()

    //  Loop and detect hands
    setInterval(() => {
      detect(model)
    }, 10)
  }

  const detect = async (model) => {
    // Check data is available
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video
      const videoWidth = webcamRef.current.video.videoWidth
      const videoHeight = webcamRef.current.video.videoHeight

      // Set video width
      webcamRef.current.video.width = videoWidth
      webcamRef.current.video.height = videoHeight

      // Set canvas height and width
      canvasRef.current.width = videoWidth
      canvasRef.current.height = videoHeight

      // Make Detections / classify the image:
      const detectedObject = await model.detect(video)
      console.log('object data detected:', detectedObject)

      // Make object based actions:
      if (detectedObject[0].class === 'person') {
        console.log('PERSON')
      }

      // Draw mesh - our Canvas
      const ctx = canvasRef.current.getContext('2d')

      // Update drawing utility
      // drawSomething(obj, ctx)
      drawRect(detectedObject, ctx)
    }
  }

  // useEffect(()=>{runCoco()},[]);

  useEffect(() => {
    runCoco()
  })

  return (
    <div className='App'>
      {/* NOTE: Still image capture button: */}
      <button onClick={capture}>Capture Photo</button>
      {imgSrc && (
        <img src={imgSrc} alt='Screen shot' />
        // <img src={imgSrc} alt='Screen shot' width='300' height='220' />
      )}

      <header className='App-header'>
        <Webcam
          // Props for Webcam
          ref={webcamRef}
          audio={false}
          muted={true}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zindex: 9,
            width: 640,
            height: 360,
          }}
          screenshotFormat='image/webp'
        />

        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zindex: 8,
            width: 480,
            height: 360,
          }}
        />
      </header>
    </div>
  )
}

export default App
