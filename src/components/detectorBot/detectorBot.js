import React, { useState } from "react";
import axios from "axios";
// import "./homepage.css";
import {url} from "../../backendUrl.js";
import SearchList from "./detectorBot.js"

const DetectorBot = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [warning, setWarning] = useState('');
  const [warningText, setWarningText] = useState('');
  function startMonitoring(e) {
    e.preventDefault();
    // console.log(username, email);
    if(username=='' || email=='') {
      setWarning('error')
      setWarningText('Please enter valid username and twitter handle.')
      return;
    }
    axios.post(url+'/track', {
      username, email
    })
    .then(resp=>{
      console.log(resp.data);
      setWarning('success')
      setWarningText('User tracking started.')
    })
    .catch(err=>{
      console.log('Error in API call.', err);
      setWarning('error')
      setWarningText('Please try again after sometime.')
    })
  }
  return (
    // <div></div>
    <div>
      <div className="body-background">
        <div className="overlay"></div>
        {warning?<div className={warning}>{warningText}</div>:''}
        <div className="xyz">
          <div className="search-bar"> </div>
         
          <br></br>
          <h2>Bot for Hate Speech Detection</h2>
          <form onSubmit={startMonitoring}>
          <div>
          <input
            className="detector-bot-input"
            type="text"
            placeholder="Enter twitter Handle"
            onChange={(e)=>{setUsername(e.target.value)}}
          />
          </div>
          <div>
          <input
            className="detector-bot-input"
            type="text"
            placeholder="Enter your email"
            onChange={(e)=>{setEmail(e.target.value)}}
          />
          <br/>
          <div>
          <input className="button-styling" type="submit"></input>
          </div>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DetectorBot;