import React, { Component } from "react"
import { HashRouter as Router, Route } from "react-router-dom"
import ReactGA from "react-ga"
import createHistory from "history/createBrowserHistory"

import asyncComponent from "./components/AsyncComponent"
import synapseMarkup from "./components/synapseMarkup"
import ScrollToTop from "./components/ScrollToTop"

// component js
const AsyncHome = asyncComponent(() => import("./components/Home"))
const AsyncLogin = asyncComponent(() => import("./components/LoginExample"))
const AsyncHeader = asyncComponent(() => import("./components/Header"))
const AsyncAbout = asyncComponent(() => import("./components/About"))
const AsyncOrganizations = asyncComponent(() => import("./components/Organizations"))
const AsyncOrgCTF = asyncComponent(() => import("./components/Organizations-CTF"))
const AsyncOrgNIH = asyncComponent(() => import("./components/Organizations-NIH"))
const AsyncOrgNTAP = asyncComponent(() => import("./components/Organizations-NTAP"))
const AsyncExplore = asyncComponent(() => import("./components/Explore.jsx"))
const AsyncVersions = asyncComponent(() => import("./components/Versions"))

ReactGA.initialize("UA-29804340-4")

const logoWhite = require("./images/nf-logo-white.svg")

const history = createHistory()
history.listen((location) => {
  ReactGA.set({
    page: location.pathname + location.hash + location.search,
  })
  ReactGA.pageview(location.pathname + location.hash + location.search)
})

class App extends Component {
  state = {
    hash: "",
    loginToken: "",
    syn16859580: {},
    syn16859580_s: {},
    syn16858699: {},
    syn16858699_s: {},
    syn16858331: {},
    syn16858331_s: {},
    syn16857542: {},
    syn16857542_s: {},
    syn16787123: {},
    syn16787123_s: {},
    syn16859448: {},
    syn16859448_s: {},
  };

  handleChanges = (KEY, NEWSTATE) => {
    this.setState({
      [KEY]: NEWSTATE,
    })
  };

  handleNestedChanges = (KEY, newStateKey, newState) => {
    const property = this.state[KEY]
    property.push({ [newStateKey]: newState })
    this.setState(prevState => ({
      ...prevState,
      property,
    }))
  };

  ReturnHome = () => {
    return (
      <AsyncHome
        handleChanges={this.handleChanges}
        studies={this.state.syn16787123_s}
        publications={this.state.syn16857542_s}
        datasets={this.state.syn16859580_s}
        organizations={this.state.syn16858699}
      />
    )
  };

  ReturnAbout = () => {
    return (
      <AsyncAbout
        handleChanges={this.handleChanges}
      />
    )
  };

  ReturnOrganizations = () => {
    return (
      <AsyncOrganizations
        handleChanges={this.handleChanges}
      />
    )
  };

  ReturnHeader = () => {
    return (
      <AsyncHeader handleChanges={this.handleChanges} hash={this.state.hash} />
    )
  };

  ReturnExplore = () => {
    return (
      <AsyncExplore />
    )
  }

  ReturnCTF = () => {
    return (
      <AsyncOrgCTF />
    )
  }

  ReturnNIH = () => {
    return (
      <AsyncOrgNIH />
    )
  }

  ReturnNTAP = () => {
    return (
      <AsyncOrgNTAP />
    )
  }


  ReturnVersions = () => {
    return (
      <AsyncVersions hash={this.state.hash} />
    )
  };

  ReturnLogin = () => {
    return (
      <AsyncLogin hash={this.state.hash} />
    )
  };

  render() {
    return (
      <Router>
        <ScrollToTop>
          <div className="row amp-ad">
            <this.ReturnHeader />
            <div className="main">
              <Route exact path="/" component={this.ReturnHome} />
              <Route path="/About" component={this.ReturnAbout} />
              <Route path="/Organizations" component={this.ReturnOrganizations} />
              <Route path="/Organizations-CTF" component={this.ReturnCTF} />
              <Route path="/Organizations-DHART-SPORE" component={this.ReturnNIH} />
              <Route path="/Organizations-NTAP" component={this.ReturnNTAP} />

              <Route path="/Explore" component={this.ReturnExplore} />

              <Route path="/markup" component={synapseMarkup} />
              <Route path="/Versions" component={this.ReturnVersions} />
              <Route path="/Login" component={this.ReturnLogin} />
            </div>

            <footer>
              <div className="container">
                <div className="row">
                  <div className="nf-logo-footer col-md-8 col-sm-8 col-xs-12">
                    <a href="#/"><img src={logoWhite} alt="nf portal logo" /></a>
                  </div>
                  <div className="col-md-4 col-sm-4 col-xs-12 flex justify-end right-footer">
                    <a href="https://www.synapse.org/#!Synapse:syn5702691/discussion/default" rel="noopener noreferrer" target="_blank">Contact Us</a>
                    <a
                      target="blank"
                      href="https://s3.amazonaws.com/static.synapse.org/governance/SageBionetworksSynapseTermsandConditionsofUse.pdf?v=5"
                    >
                    Terms of Use
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </ScrollToTop>
      </Router>
    )
  }
}

export default App
