import React, { Component } from "react"
import PropTypes from "prop-types"
import SynapseChart from "./SynapseBarChart.jsx"
import { returnSynapseValue } from "../library/synapseObjects"

class ExploreContent extends Component {
  state = {
    activeButton: "syn16859580",
    activeFilter: "diseaseFocus",
    color: 0,
  };

  componentDidMount() {
    this.handleButtonPress("syn16859580")
  }

  handleChanges = (KEY, NEWSTATE) => {
    this.setState({
      [KEY]: NEWSTATE,
    })
  };

  handleButtonPress = (id) => {
    const activeFilter = returnSynapseValue(undefined, id, "filter")
    const color = returnSynapseValue(undefined, id, "color")
    this.setState({
      activeButton: id,
      activeFilter,
      color,
    })
    return ""
  };

  returnButtonClass = (id) => {
    return `btn-control ${this.state.activeButton === id ? "active" : ""}`
  };

  render() {
    return (
      <section className="row explore-content">
        <div className="container">
          <div className="row">
            <h2>Explore Content</h2>
          </div>
          <div className="row">
            <div className="center-block selectors-container">
              <div className="selectors">
                <button
                  className={this.returnButtonClass("syn16858699")}
                  type="button"
                  onClick={() => this.handleButtonPress("syn16858699", this.props.token)
                  }
                >
                  <h5>FUNDERS</h5>
                </button>
                <button
                  className={this.returnButtonClass("syn16859580")}
                  type="button"
                  onClick={() => this.handleButtonPress("syn16859580", this.props.token)
                  }
                >
                  <h5>DATASETS</h5>
                </button>
                <button
                  className={this.returnButtonClass("syn16858331")}
                  type="button"
                  onClick={() => this.handleButtonPress("syn16858331", this.props.token)
                  }
                >
                  <h5>FILES</h5>
                </button>
                <button
                  className={this.returnButtonClass("syn16787123")}
                  type="button"
                  onClick={() => this.handleButtonPress("syn16787123", this.props.token)
                  }
                >
                  <h5>STUDIES</h5>
                </button>
                <button
                  className={this.returnButtonClass("")}
                  type="button"
                  onClick={() => this.handleButtonPress("", this.props.token)
                  }
                >
                  <h5>ANALYSIS</h5>
                </button>
                <button
                  className={this.returnButtonClass("syn16857542")}
                  type="button"
                  onClick={() => this.handleButtonPress("syn16857542", this.props.token)
                  }
                >
                  <h5>PUBLICATIONS</h5>
                </button>
              </div>
            </div>
            <SynapseChart
              token={this.props.token}
              synId={this.state.activeButton}
              filter={this.state.activeFilter}
              rgbIndex={this.state.color}
              barChart
            />
          </div>
        </div>
      </section>
    )
  }
}

ExploreContent.propTypes = {
  token: PropTypes.string.isRequired,
}

export default ExploreContent
