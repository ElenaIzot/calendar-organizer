import { useState } from 'react';
import Calendar from "react-calendar";
import EventPage from './EventPage';
import HolidayPage from './HolidayPage';
import {
    CalendarEvent, getEventsFromStorage, isEvent,
    isHoliday, isNote, saveEventsToStorage
} from './Models';

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

    let renderedHoliday;
    let renderedEvent;
    let renderedNotes;
    let renderNothing;;

    for (let i = 0; i <= localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key == day.toLocaleDateString()) {
            let events = JSON.parse(localStorage.getItem(`${key}`) || '[]');
            for (const event of events) {
                if (isNote(event)) {
                    renderedNotes = (<div className="form">
                        <label className='form__item'>
                            <p className='events__title'>Заметка: {event.name}</p>
                        </label  >
                        <label className='form__item'>
                            <p className='events__title'>Текст: {event.text}
                            </p>
                        </label>
                    </div>
                    );
                } else if (isHoliday(event)) {
                    renderedHoliday = (<div className="form">
                        <p className='events__title'>Праздник: {event.name}</p>
                        <p className='events__title'>Бюджет: {event.budget}</p>
                    </div>
                    );
                } else if (isEvent(event)) {
                    renderedEvent = (<div className="form">
                        <label className='form__item'>
                            <p className='events__title'>Мероприятие: {event.name}</p>
                        </label  >
                        <label className='form__item'>
                            <p className='events__title'>Адрес: {event.adress}
                            </p>
                        </label>
                        <label className='form__item'>
                            <p className='events__title'>Время: {event.time}
                            </p>
                        </label>
                    </div>
                    );
                }
            }
        } else if (key == '') {
            renderNothing = <div>Данные не заполнены</div>
        }
    }

    return (<>
        <section className="wrap">
            <div className="calendar">
                <Calendar
                    className="react-calendar"
                    onChange={onChange}
                    value={value}
                    onClickDay={onClickDay}
                />
                <div className='events__item'>
                    <div className="form">
                        <p className='events__title'>Дата: {day.toLocaleDateString()}</p>
                    </div>
                    {renderNothing}
                    {renderedHoliday}
                    {renderedEvent}
                </div>
            </div>
            <div className='events'>
                <HolidayPage date={day} sendData={onEventCreate} />
                <EventPage date={day} sendData={onEventCreate} />

            </div>
        </section>
    </>
    );
}

export default MyCalendar;

// const savedEvents = localStorage.setItem(`${changeDay}`, JSON.stringify(events));
// const events1: Array<CalendarEvent> = JSON.parse(localStorage.get('2021-08-16') || '[]')