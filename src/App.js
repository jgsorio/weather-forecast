import React from 'react';
import api from './api';

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      city: '',
      forecast: []
    };
  }

  async componentDidMount () {
    const { data } = await api.get('?woeid=455827&format=json-cors')
    this.setState({
      city: data.results.city_name,
      forecast: data.results.forecast
    })
  }

  render () {
    return (
      <div className="container">
        <h1>{this.state.city}</h1>
        <table className="striped centered">
          <thead>
            <tr>
              <th>Day</th>
              <th>Min</th>
              <th>Max</th>
              <th>Description</th>
              <th>Condition</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.forecast.map((day, i) => (
                <tr key={i}>
                  <td>{day.date}</td>
                  <td>{day.min}</td>
                  <td>{day.max}</td>
                  <td>{day.description}</td>
                  <td><img src={`https://assets.hgbrasil.com/weather/icons/conditions/${day.condition}.svg`} alt={day.condition}/></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default App;
