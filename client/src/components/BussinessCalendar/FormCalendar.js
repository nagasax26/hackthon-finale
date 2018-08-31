import React, { Component } from 'react';
import axios from 'axios';
import { inject, observer } from '../../../node_modules/mobx-react';
import moment from 'moment';

require('./BussinessCalendar.css');



@inject('store')
@observer
class FormCalendar extends Component {

    handleChangeStartPeriod = event => {

        this.props.store.setBussinessCalendar({ key: event.target.name, value: event.target.value });
    }

    handleChangeEndPeriod = event => {

        this.props.store.setBussinessCalendar({ key: event.target.name, value: event.target.value });
        if (this.props.store.bussinessCalendar.startPeriod > this.props.store.bussinessCalendar.endPeriod) {
            alert('endPeriod is small')
        }

    }

    handleChangeTime = event => {

        this.props.store.setBussinessCalendarDayTime({ key: event.target.name, value: event.target.value });
    }


    handleClickDays = event => {

        this.props.store.setBussinessCalendarDay(event.target.name);

    }

    handleSubmit = event => {
        // Prevent the default behavior of the page (refresh)-using in forms
        event.preventDefault();
        if (this.props.store.bussinessCalendar.workDays[0].statrTime > this.props.store.bussinessCalendar.workDays[0].endTime) {
            alert('endTime is small');
        }

        let periodWorkDays = [];

        let start = moment(this.props.store.bussinessCalendar.startPeriod);
        let end = moment(this.props.store.bussinessCalendar.endPeriod);
        // let numDays = end.diff(start, 'days') 
        
        
        for (let d = start; d <= end; d= d.add(1,'d')) {
            // console.log(d.toDate());
            if(this.props.store.bussinessCalendar.workDays[d.day()].flag){
                periodWorkDays.push({date:d.toDate(),timeStart:this.props.store.bussinessCalendar.workDays[0].statrTime,timeEnd:this.props.store.bussinessCalendar.workDays[0].endTime});
            }
        }
        // console.log(periodWorkDays);
        this.props.store.setBussinessCalendarWorkDays(periodWorkDays);

    }


    render() {
        return (
            <div><form onSubmit={this.handleSubmit} n>
                <div>
                    <label>open your calendar from :
            <input onChange={this.handleChangeStartPeriod} name="startPeriod" type="date" placeholder="date" value={this.props.store.bussinessCalendar.startPeriod} requierd />
                        to
                         <input onChange={this.handleChangeEndPeriod} name="endPeriod" type="date" placeholder="date" value={this.props.store.bussinessCalendar.endPeriod} requierd />
                    </label>
                </div>
                <div>
                    <br /><label>your workdays: </label>
                    <div class="weekDays-selector">

                        <input onClick={this.handleClickDays} name="weekday-sun" type="checkbox" id="weekday-sun" class="weekday" />
                        <label for="weekday-sun">S</label>
                        <input onClick={this.handleClickDays} name="weekday-mon" type="checkbox" id="weekday-mon" class="weekday" />
                        <label for="weekday-mon">M</label>
                        <input onClick={this.handleClickDays} name="weekday-tue" type="checkbox" id="weekday-tue" class="weekday" />
                        <label for="weekday-tue">T</label>
                        <input onClick={this.handleClickDays} name="weekday-wed" type="checkbox" id="weekday-wed" class="weekday" />
                        <label for="weekday-wed">W</label>
                        <input onClick={this.handleClickDays} name="weekday-thu" type="checkbox" id="weekday-thu" class="weekday" />
                        <label for="weekday-thu">T</label>
                        <input onClick={this.handleClickDays} name="weekday-fri" type="checkbox" id="weekday-fri" class="weekday" />
                        <label for="weekday-fri">F</label>
                        <input onClick={this.handleClickDays} name="weekday-sat" type="checkbox" id="weekday-sat" class="weekday" />
                        <label for="weekday-sat">S</label>

                    </div>
                </div>
                <div>
                    <label>work hours from:
                    <input onChange={this.handleChangeTime} name="statrTime" type="text" pattern="^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$" placeholder="08:00 ex" value={this.props.store.bussinessCalendar.workDays[0].statrTime} requierd /> to
                    <input onChange={this.handleChangeTime} name="endTime" type="text" pattern="^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$" placeholder="17:00 ex" value={this.props.store.bussinessCalendar.workDays[0].endTime} requierd /> </label>
                    {/* <label>break from:  <input type="time" /> to  <input type="time" /> </label> */}
                </div>
                <button type="submit">save</button>
            </form></div>
        )
    }
}

export default FormCalendar;