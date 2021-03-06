import React, { Component } from 'react';
import { inject, observer } from '../../../node_modules/mobx-react';
import moment from 'moment';
import './FormCalendar.scss';
import Button from '@material-ui/core/Button'
import LoadingHOC from '../LoadingHOC/LoadingHOC';
import Modal from '@material-ui/core/Modal';


@inject('store')
@observer
class FormCalendar extends Component {
    state = {
        open: false
    }
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


        for (let d = start; d <= end; d = d.add(1, 'd')) {
            debugger;
            if (this.props.store.bussinessCalendar.workDays[d.day()].flag) {
                periodWorkDays.push({ date: d.format("DD/MM/YYYY"), timeStart: this.props.store.bussinessCalendar.workDays[0].statrTime, timeEnd: this.props.store.bussinessCalendar.workDays[0].endTime });
            }
        }
        this.props.store.setBussinessCalendarWorkDays(periodWorkDays);

    }
    handleClick = () => {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    render() {
        return (
            <React.Fragment>
                <Button style={{ marginLeft: "20px" }} variant="contained" color="primary" onClick={this.handleClick}>set days</Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div className="calendar">
                        <LoadingHOC>
                            <form className="calendar__form" onSubmit={this.handleSubmit}>
                                <div className="calendar__group">
                                    <label className="calendar__label">open your calendar from :</label>
                                    <input className="calendar__input" onChange={this.handleChangeStartPeriod} name="startPeriod" type="date" placeholder="date" value={this.props.store.bussinessCalendar.startPeriod} required />
                                    <span className="calendar__label">to</span>
                                    <input className="calendar__input" onChange={this.handleChangeEndPeriod} name="endPeriod" type="date" placeholder="date" value={this.props.store.bussinessCalendar.endPeriod} required />
                                </div>
                                <div className="calendar__group">
                                    <label className="calendar__label">your workdays: </label>
                                    <div className="weekDays-selector">
                                        <input onClick={this.handleClickDays} name="weekday-sun" type="checkbox" id="weekday-sun" className="weekday" />
                                        <label htmlFor="weekday-sun">S</label>
                                        <input onClick={this.handleClickDays} name="weekday-mon" type="checkbox" id="weekday-mon" className="weekday" />
                                        <label htmlFor="weekday-mon">M</label>
                                        <input onClick={this.handleClickDays} name="weekday-tue" type="checkbox" id="weekday-tue" className="weekday" />
                                        <label htmlFor="weekday-tue">T</label>
                                        <input onClick={this.handleClickDays} name="weekday-wed" type="checkbox" id="weekday-wed" className="weekday" />
                                        <label htmlFor="weekday-wed">W</label>
                                        <input onClick={this.handleClickDays} name="weekday-thu" type="checkbox" id="weekday-thu" className="weekday" />
                                        <label htmlFor="weekday-thu">T</label>
                                        <input onClick={this.handleClickDays} name="weekday-fri" type="checkbox" id="weekday-fri" className="weekday" />
                                        <label htmlFor="weekday-fri">F</label>
                                        <input onClick={this.handleClickDays} name="weekday-sat" type="checkbox" id="weekday-sat" className="weekday" />
                                        <label htmlFor="weekday-sat">S</label>
                                    </div>
                                </div>
                                <div className="calendar__group">
                                    <label className="calendar__label" >work hours from: </label>
                                    <input className="calendar__input" onChange={this.handleChangeTime} name="statrTime" type="text" pattern="^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$" placeholder="08:00 ex" value={this.props.store.bussinessCalendar.workDays[0].statrTime} required />
                                    <span className="calendar__label">to</span>
                                    <input className="calendar__input" onChange={this.handleChangeTime} name="endTime" type="text" pattern="^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$" placeholder="17:00 ex" value={this.props.store.bussinessCalendar.workDays[0].endTime} required />
                                </div>
                                <Button style={{ alignSelf: "center" }} variant="raised" color="secondary" type="submit">save</Button>
                            </form>
                        </LoadingHOC>
                    </div>
                </Modal>
            </React.Fragment>
        )
    }
}

export default FormCalendar;