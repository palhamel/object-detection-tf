// Import dependencies
import React, { useRef, useState, useEffect } from "react";

import * as tf from "@tensorflow/tfjs";
//  Import required model here ** DONE **
import * as cocoSsd from "@tensorflow-models/coco-ssd"

import Webcam from "react-webcam";

import "./App.css";

// 2. TODO - Import drawing utility here
// e.g. import { drawRect } from "./utilities";
import { drawRect } from "./utilities";



function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {

    // Load TF models
    const model = await cocoSsd.load()
    
    //  Loop and detect hands
    setInterval(() => {
      detect(model);
    }, 10);
  };

  const detect = async (model) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections / classify the image:
      const detectedObject = await model.detect(video)
      // console.log('object data detected:', detectedObject)

      // Draw mesh - our Canvas
      const ctx = canvasRef.current.getContext("2d");

      // Update drawing utility
      // drawSomething(obj, ctx)  
      drawRect(detectedObject, ctx)

    }
  };

  // useEffect(()=>{runCoco()},[]);
  
  useEffect(()=>{
    runCoco()
  });

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
        // Props for Webcam
          ref={webcamRef}
          audio={false}
          muted={true} 
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 360,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 360,
          }}
        />
      </header>
    </div>
  );
}

export default App;
