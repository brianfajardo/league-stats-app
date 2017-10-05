import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchStats } from '../actions'
import regionOptions from '../constants/regionOptions'

// Components
import {
  Container,
  Input,
  Dropdown,
  Button,
  Image,
  Dimmer,
  Loader
} from 'semantic-ui-react'
import Header from './Header'
import Card from './Card'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      summonerName: null,
      region: null
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onDropdownChange = this.onDropdownChange.bind(this)
  }

  onInputChange(e) {
    this.setState({ summonerName: e.target.value })
  }

  onDropdownChange(e, data) {
    this.setState({ region: data.value })
  }

  onSubmit() {
    this.props.fetchStats(this.state)
  }

  render() {
    const { summoner, recentMatches, loading } = this.props
    return (
      <Container>
        <Header />
        <div className="search">
          <Input placeholder="Summoner Name" onChange={this.onInputChange} />
          <Dropdown
            selection
            placeholder="region"
            options={regionOptions}
            onChange={this.onDropdownChange}
          />{' '}
          {loading ? (
            <Loader active inline />
          ) : (
            <Button inverted color="green" onClick={this.onSubmit}>
              Find stats
            </Button>
          )}
        </div>
        {summoner &&
          recentMatches && (
            <div className="results">
              <h1 id="summoner">
                {summoner.name} <span>lvl. {summoner.summonerLevel}</span>
              </h1>
              {recentMatches.map((match, i) => <Card match={match} key={i} />)}
            </div>
          )}
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const { summoner, recentMatches, loading } = state.league
  return { summoner, recentMatches, loading }
}

export default connect(mapStateToProps, { fetchStats })(App)
