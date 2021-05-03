import React from "react";
import ReactDOM from "react-dom";
import * as cvstfjs from '@microsoft/customvision-tfjs';
import "./styles.css";

const threshold = 0.75;

async function load_model() {
  console.log("loading model...")
  const model = new cvstfjs.ClassificationModel();
  await model.loadModelAsync("/fruit/model.json");

  return model;
}
function sleep(time){
  return new Promise((resolve)=>setTimeout(resolve,time)
)
}

async function load_labels() {

  return fetch('/fruit/labels.txt')
    .then(function(response){
      return response.text();
  }).then(function (data) {
      var lines = data.split(/\n/);
      return lines;
  })
}

class App extends React.Component {
  videoRef = React.createRef();
  canvasRef = React.createRef();


  componentDidMount() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const webCamPromise = navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: "user"
          }
        })
        .then(stream => {
          window.stream = stream;
          this.videoRef.current.srcObject = stream;
          return new Promise((resolve, reject) => {
            this.videoRef.current.onloadedmetadata = () => {
              resolve();
            };
          });
        });

      const modelPromise = load_model();
      const labelPromise = load_labels();

      Promise.all([modelPromise, webCamPromise, labelPromise])
        .then(values => {
          this.predict(this.videoRef.current, values[0], values[2]);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  predict = (video, model, labels) => {

    model.executeAsync(video).then(predictions => {
      this.renderPredictions(predictions, labels);
      sleep(1000).then(()=>{
        this.predict(video, model,labels);
      })
    });

  };

  renderPredictions = (predictions,labels) => {
    let pred = predictions[0]

    this.guess_confidence = Math.max(...pred)
    this.guess_label = labels[pred.indexOf(this.guess_confidence)]

    if(this.guess_confidence > threshold) {
      document.getElementById("label").innerHTML = this.guess_label;
    } else {
      document.getElementById("label").innerHTML = "unkown"
    }
  };

  render() {
    return (
      <div>
        <h1>Camera feed</h1>
        <h3>MobileNetV2</h3>
        <video
          style={{height: '600px', width: "500px"}}
          className="size"
          autoPlay
          playsInline
          muted
          ref={this.videoRef}
          width="600"
          height="500"
          id="frame"
        />
        <canvas
          className="size"
          ref={this.canvasRef}
          width="600"
          height="500"
        />
        <h3 id="label">Loading...</h3>
      </div>

    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
