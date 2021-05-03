import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLocation: '',
      data: '',
      show: false
    };
  }

  getLocation = async (event) => {
    event.preventDefault();
    const url = `https://us1.locationiq.com/v1/search.php?key=pk.d36871f015649f915282f374cff76628&q=${this.state.selectedLocation}&format=json`;

    const myApi = await axios.get(`http://localhost:3002/about`);
    let select = await axios.get(url);
    console.log(myApi.data);
    this.setState({
      data: select.data[0],
      show: true
    })
  };

  updateselectedLocation = (e) => {
    this.setState({ selectedLocation: e.target.value });
    console.log(this.state.selectedLocation);
  }

  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>City Explorer</h1>
        <Form style={{ textAlign: 'center' }} onSubmit={this.getLocation}>
          <Form.Group controlId="formBasicText">
            <Form.Label>Find City</Form.Label>
            <br />
            <Form.Control style={{ width: '300px' }} onChange={this.updateselectedLocation} type="Text" placeholder="Enter City" />
          </Form.Group>
          <Button style={{ color: 'white', backgroundColor: 'black', width: '150px' }} variant="primary" type="submit">
            Search
  </Button>
        </Form  >
        {this.state.show &&
          <p style={{ textAlign: 'center' }}>
            {this.state.data.display_name}
          </p>}
        <br />
        {this.state.show &&
          <img style={{ width: '35%', paddingLeft: '35%' }} src={`https://maps.locationiq.com/v3/staticmap?key=pk.d36871f015649f915282f374cff76628&q&center=${this.state.data.lat},${this.state.data.lon}&zoom=11`} alt='' />}
      </div>
    )
  }
}

export default App
