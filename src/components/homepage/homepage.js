import React, { useState } from "react";
import "./homepage.css";
import DetectorBot from "../detectorBot/detectorBot"
import HateDetect from "../hateSpeechDetector/hateSpeechDetector";

const Homepage = () => {
  function openBotPage(e) {
    e.preventDefault()
    setContent(<DetectorBot/>)
  }
  function openDetectorPage(e) {
    e.preventDefault()
    setContent(<HateDetect/>)
  }
  const [content, setContent] = useState(
    <div>
      <div className="body-background">
        <div className="overlay"></div>
        <div className="xyz">
          <br></br>
          <h2>Hate Speech Detection</h2>
          <br/>
          <div className="abc">
            <button className="button-styling2" onClick={(e)=>openDetectorPage(e)}>Detect Hate Speech</button>
            <button className="button-styling2" onClick={(e)=>openBotPage(e)}>Twitter Bot</button>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <>{content}</>
  );
};

export default Homepage;