import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../backendUrl.js";
import SearchList from "../detectorBot/detectorBot.js";

const HateDetect = () => {
  const [modelsList, setModelsList] = useState([]);
  const [text, setText] = useState("");
  const [model, setModel] = useState("");
  const [warning, setWarning] = useState('')
  const [warningText, setWarningText] = useState('')
  function makeQuery(e) {
    e.preventDefault();
    if(model=='') {
      setWarning('error')
      setWarningText('Please select a valid model.')
      return
    }
    if(text=='') {
      setWarning('error')
      setWarningText('Please enter some text to predict.')
      return ;
    }
    axios
      .post(url + "/predict", {
        model,
        arr: [text],
      })
      .then((resp) => {
        console.log(resp.data);
        if(resp.data.predictions[0]=='Normal') {
          setWarning('success')
        } else {
          setWarning('error')
        }
        setWarningText(`Given text is ${resp.data.predictions[0]}`)
      })
      .catch((err) => {
        console.log(err);
        setWarning('error')
        setWarningText("Please try again after sometime.");
      });
  }
  const [models, setModels] = useState([]);
  function changeModel(e, new_model) {
    e.preventDefault();
    console.log(new_model);
    setModel(new_model);
  }
  useEffect(() => {
    let temp = [];
    console.log(modelsList);
    for(let i=0;i<modelsList.length;i++) {
      temp.push(<button key={i} onClick={(e)=>changeModel(e, modelsList[i])} className={"button-styling"+(model==modelsList[i]?' active':'')}>{modelsList[i]}</button>)
    }
    setModels(temp);
  }, [model, modelsList]);
  useEffect(() => {
    axios
      .get(url + "/models")
      .then((res) => {
        setModelsList(res.data.models);
        let temp = [];
        setModels(temp);
      })
      .catch((err) => {
        console.log(err);
        setWarning('error')
        setWarningText(
          "Error in fetching saved models. Please try again after sometime."
        );
      });
  }, []);
  return (
    <div>
      <div className="body-background">
        <div className="overlay"></div>
        {warning?<div className={warning}>{warningText}</div>:''}
        <div className="xyz">
          <div className="abc">
            {models}
          </div>

          <br></br>
          <h2>Enter text to check</h2>
          <form onSubmit={makeQuery}>
            <textarea
              className="home-body-input"
              type="text"
              placeholder="Enter text here...."
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <div>
              <input type="submit" className="button-styling"></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HateDetect;
