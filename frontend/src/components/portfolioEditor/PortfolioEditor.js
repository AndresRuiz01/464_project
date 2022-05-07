import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./PortfolioEditor.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function PortfolioEditor({loggedInUserInfo, updateUserPortfolio}) {

  const navigate = useNavigate();

  const [portfolio, setPortfolio] = useState({})
  const [newPortfolio, setNewPortfolio] = useState(false)
  const [imageOne, setImageOne] = useState(null)
  const [imageTwo, setImageTwo] = useState(null)
  const [imageThree, setImageThree] = useState(null)
  function cancelChanges() {
    navigate("/portfolios")
  }


  function updatePortfolio(field, value) {
    let portfolioCopy = JSON.parse(JSON.stringify(portfolio))
    if (value.length === 0) {
      portfolioCopy[field] = null
    } else {
      portfolioCopy[field] = value
    }
    setPortfolio(portfolioCopy)
  }

  function createPortfolio () {

    var form_data = new FormData();

    for ( var key in portfolio ) {
        form_data.append(key, portfolio[key]);
    }

    form_data.append("UserID", loggedInUserInfo["UserID"])

    axios.post('http://localhost:5000/createPortfolio', form_data ,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  async function handleSubmit(event) {
    event.preventDefault();
    
    if (newPortfolio) {
      createPortfolio()
      navigate("/portfolios")
      return
    }

    var form_data = new FormData();

    for ( var key in portfolio ) {
      if (key === "ProjectOneImage") {
        form_data.append(key, imageOne);
      }
      else if (key === "ProjectTwoImage") {
        form_data.append(key, imageTwo);
      }
      else if (key === "ProjectThreeImage") {
        form_data.append(key, imageThree);
      } else {
        form_data.append(key, portfolio[key]);
      }
    }

    axios.post('http://localhost:5000/updateUserPortfolio', form_data ,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  

    navigate("/portfolios")
  }

  const { id } = useParams();

  useEffect(() => {
    // Ensure only correct user can view
    if (!loggedInUserInfo.hasOwnProperty("UserID") || loggedInUserInfo["UserID"] != id) {
      navigate("/")
    }

    // Now complete api request
    let userIdJson = {"UserID": loggedInUserInfo["UserID"]}
    axios.post('http://localhost:5000/getPortfolio', userIdJson ,{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      const portfolio = res.data;
      setPortfolio(portfolio)
    }).catch(function(error) {
      setNewPortfolio(true)
    })
  }, [])

  return (
    <div className="editor">
      <h1 id="editor-heading">Editor</h1>
      <Form onSubmit={handleSubmit}>
        {/* About Page */}
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">About Me</span>
          </div>
          <textarea onChange={(e) => {updatePortfolio("AboutSection", e.target.value)}} value={portfolio["AboutSection"]} style={{height: "125px"}} class="form-control"></textarea>
        </div>
        <div style={{height: "30px"}}></div>

        { /* Projects */ }
        <label style={{fontWeight: "bolder"}} for="exampleFormControlTextarea1">Project One</label>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon3">Title</span>
          </div>
          <input onChange={(e) => {updatePortfolio("ProjectOneTitle", e.target.value)}} value={portfolio["ProjectOneTitle"]} type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"/>
        </div>
        <div style={{height: "10px"}}></div>

        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Description</span>
          </div>
          <textarea onChange={(e) => {updatePortfolio("ProjectOneDescription", e.target.value)}} value={portfolio["ProjectOneDescription"]} style={{height: "125px"}} class="form-control"></textarea>
        </div>
        <div style={{height: "30px"}}></div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon3">Link</span>
          </div>
          <input onChange={(e) => {updatePortfolio("ProjectOneLink", e.target.value)}} value={portfolio["ProjectOneLink"]} type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"/>
        </div>
        <div style={{height: "10px"}}></div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon3">Image</span>
          </div>
          <input onChange={(e) => {setImageOne(e.target.files[0])}} type="file" accept=".png" style={{padding: "4px"}}/>
        </div>
        <div style={{height: "10px"}}></div>


        <label style={{fontWeight: "bolder"}} for="exampleFormControlTextarea1">Project Two</label>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon3">Title</span>
          </div>
          <input onChange={(e) => {updatePortfolio("ProjectTwoTitle", e.target.value)}} value={portfolio["ProjectTwoTitle"]} type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"/>
        </div>
        <div style={{height: "10px"}}></div>

        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Description</span>
          </div>
          <textarea onChange={(e) => {updatePortfolio("ProjectTwoDescription", e.target.value)}} value={portfolio["ProjectTwoDescription"]} style={{height: "125px"}} class="form-control"></textarea>
        </div>
        <div style={{height: "30px"}}></div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon3">Link</span>
          </div>
          <input onChange={(e) => {updatePortfolio("ProjectTwoLink", e.target.value)}} value={portfolio["ProjectTwoLink"]} type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"/>
        </div>
        <div style={{height: "10px"}}></div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon3">Image</span>
          </div>
          <input onChange={(e) => {setImageTwo(e.target.files[0])}} type="file" accept=".png" style={{padding: "4px"}}/>
        </div>
        <div style={{height: "10px"}}></div>

        <label style={{fontWeight: "bolder"}} for="exampleFormControlTextarea1">Project Three</label>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon3">Title</span>
          </div>
          <input onChange={(e) => {updatePortfolio("ProjectThreeTitle", e.target.value)}} value={portfolio["ProjectThreeTitle"]} type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"/>
        </div>
        <div style={{height: "10px"}}></div>

        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Description</span>
          </div>
          <textarea onChange={(e) => {updatePortfolio("ProjectThreeDescription", e.target.value)}} value={portfolio["ProjectThreeDescription"]} style={{height: "125px"}} class="form-control"></textarea>
        </div>
        <div style={{height: "30px"}}></div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon3">Link</span>
          </div>
          <input onChange={(e) => {updatePortfolio("ProjectThreeLink", e.target.value)}} value={portfolio["ProjectThreeLink"]} type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"/>
        </div>
        <div style={{height: "10px"}}></div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon3">Image</span>
          </div>
          <input onChange={(e) => {setImageThree(e.target.files[0])}} type="file" accept=".png" style={{padding: "4px"}}/>
        </div>
        <div style={{height: "10px"}}></div>

        {/* Links */}
        <label style={{fontWeight: "bolder"}} for="exampleFormControlTextarea1">Links</label>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon3">Resume Link</span>
          </div>
          <input onChange={(e) => {updatePortfolio("ResumeLink", e.target.value)}} value={portfolio["ResumeLink"]} type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"/>
        </div>
        <div style={{height: "10px"}}></div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon3">GitHub Link</span>
          </div>
          <input onChange={(e) => {updatePortfolio("GithubLink", e.target.value)}} value={portfolio["GithubLink"]} type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"/>
        </div>
        <div style={{height: "10px"}}></div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon3">LinkedIn Link</span>
          </div>
          <input onChange={(e) => {updatePortfolio("LinkedInLink", e.target.value)}} value={portfolio["LinkedInLink"]} type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"/>
        </div>
        <div style={{height: "10px"}}></div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon3">Email</span>
          </div>
          <input onChange={(e) => {updatePortfolio("Email", e.target.value)}} value={portfolio["Email"]} type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"/>
        </div>
        <div style={{height: "10px"}}></div>
        <div id="submit-line">
          <Button block size="lg" type="submit">
            Save
          </Button>
          <Button block size="lg" onClick={cancelChanges}>
            Cancel
          </Button>
        </div>
      </Form>
      <div style={{height: "20px"}}></div>
    </div>
  );
}