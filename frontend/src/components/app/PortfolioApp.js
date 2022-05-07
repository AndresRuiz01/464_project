import React from "react";
import axios from 'axios';
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



import {
  ViewAbout,
  ViewProjects,
  ViewResume,
  ViewNavigation,
  PortfoliosList,
  Login,
  Register,
  PortfolioEditor,
  VisitList
} from "../../components";

class PortfolioApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUserInfo: {},
      portfolioUserInfo: {},
      portfolio: {},
      userId: 0,
      visitMutex: true,
    };
    this.setUserId = this.setUserId.bind(this)
    this.validateUserLogin = this.validateUserLogin.bind(this)
    this.registerUser = this.registerUser.bind(this)
    this.setLoggedInUserInfo = this.setLoggedInUserInfo.bind(this)
    this.updateUserPortfolio = this.updateUserPortfolio.bind(this)
  }

  setLoggedInUserInfo(userInfo) {
    this.setState({loggedInUserInfo: userInfo})
  }

  setUserId(userId) {
    console.log("called")
    if (parseInt(userId) === this.state.userId) {
      return
    }
    this.setState({userId: parseInt(userId)}, () => {this.getUserPortfolio()})
  }

  updateUserPortfolio(portfolio) {
    let requestInfo = portfolio;
    requestInfo["UserID"] = this.state.userId;
    axios.post('http://localhost:5000/updateUserPortfolio', requestInfo ,{
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  getUserPortfolio() {
      let userIdJson = {"UserID": this.state.userId}
      axios.post('http://localhost:5000/getPortfolio', userIdJson ,{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        const portfolio = res.data;
        this.setState({ portfolio });
      })

      axios.post('http://localhost:5000/getUserInfo', userIdJson ,{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        const portfolioUserInfo = res.data;
        this.setState({ portfolioUserInfo });
      })

      if (!this.state.loggedInUserInfo.hasOwnProperty("UserID")) {
        return
      }

      if (this.state.loggedInUserInfo["UserID"] === this.state.userId) {
        return
      }

      let visitJSON = {"VisitingUserID": this.state.loggedInUserInfo["UserID"], "VisitedUserID": this.state.userId}


      console.log(visitJSON)

      axios.post('http://localhost:5000/createVisit', visitJSON, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

  }

  validateUserLogin(email, password) {
    return new Promise((resolve) => {
      let credentials = {"Email": email, "Pwd": password}
      axios.post('http://localhost:5000/login', credentials ,{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        let loggedInUserInfo = res.data
        resolve(loggedInUserInfo)
      }).catch(function (error) {
        resolve({})
      })
    })
  }

  registerUser(firstName, lastName, occupation, email, password) {
    let registrationInfo = {
      "FirstName": firstName,
      "LastName": lastName,
      "Occupation": occupation,
      "Email": email, 
      "Pwd": password
    }
    axios.post('http://localhost:5000/createUser', registrationInfo ,{
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  render() {
    return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Login setLoggedInUserInfo={this.setLoggedInUserInfo} loggedInUserInfo={this.state.loggedInUserInfo} validateUserLogin={this.validateUserLogin}/>} />
            <Route path="/register" element={<Register registerUser={this.registerUser}/>} />
            <Route path="/portfolios" element={<PortfoliosList setLoggedInUserInfo={this.setLoggedInUserInfo} loggedInUserInfo={this.state.loggedInUserInfo}/>} />
            <Route path="/:id/views" element={<VisitList loggedInUserInfo={this.state.loggedInUserInfo} setLoggedInUserInfo={this.setLoggedInUserInfo}/>} />
            <Route path="/:id/view" element={<ViewNavigation portfolio={this.state.portfolio} userId={this.state.userId} setUserId={this.setUserId} />} />
            <Route path="/:id/view/about" element={<ViewAbout portfolio={this.state.portfolio} userId={this.state.userId} setUserId={this.setUserId} />} />
            <Route path="/:id/view/projects" element={<ViewProjects portfolio={this.state.portfolio} userId={this.state.userId} setUserId={this.setUserId} />} />
            <Route path="/:id/view/resume" element={<ViewResume portfolio={this.state.portfolio} userId={this.state.userId} setUserId={this.setUserId} />} />
            <Route path="/:id/editor" element={<PortfolioEditor updateUserPortfolio={this.updateUserPortfolio} loggedInUserInfo={this.state.loggedInUserInfo}/>} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default PortfolioApp;