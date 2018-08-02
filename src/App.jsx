import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import Routes from './Routes';
import reactLogo from './assets/React-icon.png';
import ReactDOM from 'react-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

//Declaration
var total = 0;

class App extends React.Component {
  constructor() {
    super();

    //It can be replaced with a JSON file 
    this.state = {
      data:
        [
          {
            "id": 1,
            "Date": "2018-08-01 Monday",
            "Intake": [{ "Count": 100, "ProductName": "Banana" }, { "Count": 546, "ProductName": "Chocolate" }],
            "total": 0
          },
          {
            "id": 2,
            "Date": "2018-08-04 Thursday",
            "Intake": [
              { "Count": 42, "ProductName": "Milk" },
              { "Count": 165, "ProductName": "Chicken Breast" },
              { "Count": 207, "ProductName": "Ice cream" },
              { "Count": 101, "ProductName": "Soda Pop" },
              { "Count": 257, "ProductName": "Big Mac" }
            ],
            "total": 0
          },
          {
            "id": 3,
            "Date": "2018-08-02 Tuesday",
            "Intake": [
              { "Count": 42, "ProductName": "Milk" },
              { "Count": 165, "ProductName": "Chicken Breast" },
              { "Count": 207, "ProductName": "Ice cream" },
              { "Count": 201, "ProductName": "Soda Pop" }
            ],
            "total": 0
          },
          {
            "id": 4,
            "Date": "2018-08-03 Wednesday",
            "Intake": [
              { "Count": 600, "ProductName": "Bread" },
              { "Count": 257, "ProductName": "Big Mac" }
            ],
            "total": 0
          }
        ]
    }
  }

  render() {


    //Calculate Total Calories Conssumed for each day 
    this.state.data.map((calorieList, i) => calorieList.Intake.map((kal, j) => {
      calorieList.total = 0;
      return kal.Count
    }).map((counted, m) => { calorieList.total += counted }))

    return (
      <div className="container">

        <div className="container">
          <Header />
          <br />
        </div>

        {/* Your Daily Log Table */}
        <div className="row col-md-12">
          <h4>Your Daily Log</h4>
          <table className="table col-md-12 text-center" >
            <thead>
              <tr>
                <th>Id</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.data.map((list, i) =>
                  <TableRow key={i} data={list} />
                )
              }
            </tbody>
          </table>
          <br />

          {/* Details of your consumption table based on selected date*/}
          <h4>Details</h4>
          <table className="table col-md-12" >
            <thead>
              <tr>
                <th>Calories</th>
                <th>Product Name</th>
              </tr>
            </thead>
            <tbody>
              {JSON.parse(localStorage.yes).map((Intake, index) => <TableRowIntake key={index} data={Intake} />)}
              <tr>
                <td colSpan="2">
                  <b className="h5"> Your Total Calories:  {total} calories</b>
                </td>
              </tr>
            </tbody>
          </table>
          <br /><br />
        </div>

        {/* Graph & Chart for all */}
        <div className="row container">
          <h4>Your Graph</h4><br /><br />
          <SimpleLineChart data={this.state.data} />
        </div>

        <br /><br /><br />
        <footer>Made By Amirreza</footer>
      </div>

    );
  }
}

// Components Declaration

class Header extends React.Component {
  render() {
    return (
      <div className="text-center">
        <h1>Your Calorie Log</h1>
      </div>
    );
  }
}

class TableRow extends React.Component {

  getAllIntakes() {

    //Rest Total
    total = 0;

    localStorage.yes = JSON.stringify(this.props.data.Intake);

    //Calculate Total 
    this.props.data.Intake.map((Intake, index) => total += parseInt(Intake.Count));
    this.props.data.total = total;

    //Refresh DOM
    ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
  }

  render() {
    return (
      <tr>
        <td>{this.props.data.id}</td>
        <td><button className="btn btn-link" onClick={(e) => this.getAllIntakes(e)} >{this.props.data.Date}</button></td>
      </tr>
    );
  }
}

class TableRowIntake extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.data.Count}</td>
        <td>{this.props.data.ProductName}</td>
      </tr>
    );
  }
}

class SimpleLineChart extends React.Component {
  render() {
    return (
      <LineChart width={500} height={300} data={this.props.data}>
        <Line type="monotone" dataKey="total" stroke="#8884d8" />
        <CartesianGrid strokeDasharray="2 2" />
        <Tooltip />
        <Legend />
        <XAxis dataKey="Date" />
        <YAxis />
      </LineChart>
    );
  }
}

//Export 
export default App;






