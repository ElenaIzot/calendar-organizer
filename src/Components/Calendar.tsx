import { useState } from 'react';
import Calendar from "react-calendar";
import Event from './Event';
import Holiday from './Holiday';
import Note from './Note';
import {
    CalendarEvent, getEventsFromStorage, isEvent,
    isHoliday, isNote, saveEventsToStorage
} from './Models';
import { Tab, Tabs } from 'react-bootstrap';

function MyCalendar() {
    const [value, onChange] = useState(new Date());
    const [day, setDay] = useState(value);
    const [componentEvents, setComponentEvents] = useState<Array<CalendarEvent>>(getEventsFromStorage(day));

    const onEventCreate = (event: CalendarEvent) => {
        const events = [...componentEvents, event];
        saveEventsToStorage(day, events);
        setComponentEvents(events);
    }

    function onClickDay(value: Date, e: any): void {
        e.preventDefault();
        setDay(value);
        setComponentEvents(getEventsFromStorage(value));
    }

    function deleteEvent(e: any): void {
        e.preventDefault();
        saveEventsToStorage(day, [])
        alert('Событие удалено. Обновите страницу') //нет перерисовки при удалении
    }

    let renderedHoliday;
    let renderedEvent;
    let renderedNotes;

    for (let i = 0; i <= localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key == day.toLocaleDateString()) {
            let events = JSON.parse(localStorage.getItem(`${key}`) || '[]');
            for (const event of events) {
                if (isNote(event)) {
                    renderedNotes = (<div className="card">
                        <div className="card-body__item card-body">
                            <h6 className="card__title card-title">
                                Заметка
                            </h6>
                            <button type="button"
                                className="btn btn-outline-danger btn-sm"
                                onClick={deleteEvent}>
                                Удалить
                            </button>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                Заметка: {event.name}
                            </li>
                            <li className="list-group-item">
                                Текст: {event.text}
                            </li>
                        </ul>
                    </div>);
                } else if (isHoliday(event)) {
                    renderedHoliday = (<div className="card">
                        <div className="card-body__item card-body">
                            <h6 className="card__title card-title">
                                Праздник
                            </h6>
                            <button type="button"
                                className="btn btn-outline-danger btn-sm"
                                onClick={deleteEvent}>
                                Удалить
                            </button>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                Название: {event.name}
                            </li>
                            <li className="list-group-item">
                                Бюджет: {event.budget}
                            </li>
                        </ul>
                    </div>);
                } else if (isEvent(event)) {
                    renderedEvent = (<div className="card">
                        <div className="card-body__item card-body">
                            <h6 className="card__title card-title">
                                Мероприятие
                            </h6>
                            <button type="button"
                                className="btn btn-outline-danger btn-sm"
                                onClick={deleteEvent}>
                                Удалить
                            </button>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                Мероприятие: {event.name}
                            </li>
                            <li className="list-group-item">
                                Адрес: {event.adress}
                            </li>
                            <li className="list-group-item">
                                Время: {event.time}
                            </li>
                        </ul>
                    </div>
                    );
                }
            }
        }
    }

    const classCalendar = 'calendar react-calendar';

    return (<div className="container-xxl wrapper">
        <section className="content">
            <Calendar
                className={classCalendar}
                onChange={onChange}
                value={value}
                onClickDay={onClickDay}
            />
            <div className="card">
                <div className="card-body">
                    <h5 className="card__date card-title">
                        Текущая дата:
                        <span className="card__date_number">
                            {day.toLocaleDateString()}
                        </span>
                    </h5>
                </div>
            </div>
            {renderedHoliday}
            {renderedEvent}
            {renderedNotes}
        </section>
        <section className="content">
            <Tabs defaultActiveKey="profile" className="mb-3">
                <Tab eventKey="home" title="Праздник">
                    <Holiday date={day} sendData={onEventCreate} />
                </Tab>
                <Tab eventKey="profile" title="Мероприятие">
                    <Event date={day} sendData={onEventCreate} />
                </Tab>
                <Tab eventKey="contact" title="Заметка" >
                    <Note date={day} sendData={onEventCreate} />
                </Tab>
            </Tabs>
        </section>
    </div >);
}

export default MyCalendar;