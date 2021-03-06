import React, { Component } from 'react';
import { render } from 'react-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import {Button} from "reactstrap"
//import './style.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import NavBar from "../navbar/navbar";
import axios from "axios";
import EventsModal from "./EventsModal";


const localizer = momentLocalizer(moment);

class CalendarView extends Component {
  constructor() {
    super();
    const now = new Date();
    const events = [
      {
          id: 6,
          title: 'Meeting',
          start: new Date(2015, 3, 12, 10, 30, 0, 0),
          end: new Date(2015, 3, 12, 12, 30, 0, 0),
          desc: 'Pre-meeting meeting, to prepare for the meeting',
      },
      {
          id: 7,
          title: 'Lunch',
          start: new Date(2015, 3, 12, 12, 0, 0, 0),
          end: new Date(2015, 3, 12, 13, 0, 0, 0),
          desc: 'Power lunch',
      },
      {
          id: 8,
          title: 'Meeting',
          start: new Date(2015, 3, 12, 14, 0, 0, 0),
          end: new Date(2015, 3, 12, 15, 0, 0, 0),
      },
      {
          id: 9,
          title: 'Happy Hour',
          start: new Date(2015, 3, 12, 17, 0, 0, 0),
          end: new Date(2015, 3, 12, 17, 30, 0, 0),
          desc: 'Most important meal of the day',
      },
      {
          id: 10,
          title: 'Dinner',
          start: new Date(2015, 3, 12, 20, 0, 0, 0),
          end: new Date(2015, 3, 12, 21, 0, 0, 0),
      },
      {
          id: 11,
          title: 'Birthday Party',
          start: new Date(2015, 3, 13, 7, 0, 0),
          end: new Date(2015, 3, 13, 10, 30, 0),
      },
      {
          id: 12,
          title: 'Late Night Event',
          start: new Date(2015, 3, 17, 19, 30, 0),
          end: new Date(2015, 3, 18, 2, 0, 0),
      },
      {
          id: 12.5,
          title: 'Late Same Night Event',
          start: new Date(2015, 3, 17, 19, 30, 0),
          end: new Date(2015, 3, 17, 23, 30, 0),
      },
      {
          id: 13,
          title: 'Multi-day Event',
          start: new Date(2015, 3, 20, 19, 30, 0),
          end: new Date(2015, 3, 22, 2, 0, 0),
      },
      {
          id: 14,
          title: 'Today',
          start: new Date(new Date().setHours(new Date().getHours())),
          end: new Date(new Date().setHours(new Date().getHours())),
      },
    ]
    this.state = {
      name: 'React',
      events: [],
      active_event: {
        title: "", event_start: new Date(), event_end: new Date()
      },
      modal: false
    };
  }

  handleDateChange = (value, name) => {
    const activeEvent = { ...this.state.activeEvent, [name]: value };
    this.setState({ activeEvent });
};
  
  componentDidMount() {
    this.getEvents();
  }

  createEvent = () => {
    let eve = {
      title: "", event_start: new Date(), event_end: new Date()
    };
    this.setState({ active_event: eve, modal: !this.state.modal })
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = event => {
    this.toggle();
    if (event.id) {
      axios
        .put(`http://localhost:8000/api/events/${event.id}/`, event)
        .then(res => this.getEvents());
      return;
    }
    axios
      .post("http://localhost:8000/api/events/", event)
      .then(res => this.getEvents());
  };

  getEvents = () => {
    axios
      .get("http://localhost:8000/api/events/")
      .then(res => {
        console.log(res.data);
        let events = res.data.map(event => {
          return { id: event.id, title: event.title, start: new Date(event.event_start), end: new Date(event.event_end) };
        });
        console.log(events);
        this.setState({ events });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <NavBar />
        <Button color="success" onClick={() => this.createEvent()}>Create Event</Button>
        <p>
          
        </p>
        <div style={{ height: '500pt'}}>
          <Calendar
            events={this.state.events}
            startAccessor="start"
            endAccessor="end"
            defaultView='month'
            views={['month', 'week']}
            defaultDate={moment().toDate()}
            localizer={localizer}
          />
          {this.state.modal ? (
          <EventsModal
            activeEvent={this.state.active_event}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
        </div>
      </div>
    );
  }
}
export default CalendarView;