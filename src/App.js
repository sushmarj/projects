import React, { Component } from "react";
import './App.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class App extends Component {
  constructor() {
    super();
    this.serviceUrl = " http://localhost:3000/members";
    this.state = {
      members: [{}],
      Show: false,
      selected: null,
      name: '',
      startDate: ''
    }
  }
  componentDidMount() {
    axios.get(this.serviceUrl).then((res) => {
      this.setState({
        members: res.data
      });
    })

  }
  handleClose = () => {
    this.setState({
      show: false
    })
  }
  handleShow = (member) => {
    this.setState({
      selected: member,
      show: true,
      name: member.real_name
    })
  }
  handleChange = (date) => {
    console.log(date)
    this.setState({
      startDate: date
    })
  }

  render() {

    return (
      <div className="container">
        <div className="row " >
          {this.state.members.map((member, id) => <ul key={id}><li>
            <a variant="primary" onClick={() => this.handleShow(member)}>{member.real_name}<br /></a><br />
            <a  href="#" variant="primary" onClick={() => this.handleShow(member)}>{member.real_name}<br /></a><br />
          </li></ul>
          )}

          <Modal
            show={this.state.show}
            onHide={this.handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                {this.state.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
              />
              <RenderSelected Picked={this.state.selected}
                startDate={this.state.startDate} />

            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={this.handleClose}>
                Close
          </Button>

            </Modal.Footer>
          </Modal>

        </div>

      </div>

    );

  }
}

function RenderSelected({ Picked, startDate }) {
  if (startDate) {
    let date = []
    let finaldate = null
    let dateArray = startDate.toString().split(' ')
    let temp = dateArray[2].slice(0, 1)
    console.log(temp)
    if (Number(temp) === 0) {
      finaldate = dateArray[2].slice(1, 2)
      console.log('if')
    }
    else {
      finaldate = dateArray[2]
      console.log('not')
    }

    let date1 = ` ${dateArray[1]} ${finaldate} ${dateArray[3]}`
    console.log(date1)
    Picked.activity_periods.map((pick, p) => {
      let dateArray2 = pick.start_time.split(' ')

      let date2 = ` ${dateArray2[0]} ${dateArray2[1]} ${dateArray2[2]}`
      console.log(date2)
      if (date1 === date2) {
        date.push(pick)
      }
    })
    console.log(date)
    return (
      <div >
        {date.map((period, p) =>
          <ul key={p}><li>
            <p >Start Time : {period.start_time} </p>
            <p >End Time : {period.end_time} </p>
          </li></ul>
        )
        }
      </div>
    )
  }
  else {
    if (Picked) {
      return (
        <div >
          {Picked.activity_periods.map((period, p) =>
            <ul key={p}><li>
              <p >Start Time : {period.start_time} </p>
              <p >End Time : {period.end_time} </p>
            </li></ul>
          )
          }
        </div>
      );
    }
    else {
      return null

    }
  }
}
export default App;
