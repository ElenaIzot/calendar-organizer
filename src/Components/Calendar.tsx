import { useState } from 'react';
import Calendar from "react-calendar";
import EventPage from './EventPage';
import HolidayPage from './HolidayPage';
import {
    CalendarEvent, getEventsFromStorage, isEvent,
    isHoliday, isNote, saveEventsToStorage
} from './Models';
import NotePage from './NotePage';
import pencilOutlineWhite from '../img/pencilOutlineWhite.png'
import trashCanWhite from '../img/trashCanWhite.png'

function MyCalendar() {
    const [value, onChange] = useState(new Date());
    const [day, setDay] = useState(value);
    const [componentEvents, setComponentEvents] = useState<Array<CalendarEvent>>(getEventsFromStorage(day));
    const [visible, setVisible] = useState<boolean>(false);

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

    function addEvents(): void {
        setVisible(true);
    }

    function closeEvents(): void {
        setVisible(false);
    };

    function deleteEvent(e: any): void {
        e.preventDefault();
        saveEventsToStorage(day, [])
        alert('Событие удалено') //нет перерисовки при удалении
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
                    renderedNotes = (<div className="form">
                        <div className='content__item'>
                            <p className='events__title'>Заметка:</p>
                            <button className="btn btn_icon">
                                <img src={pencilOutlineWhite} alt="Edit" />
                            </button>
                            <button className="btn btn_icon">
                                <img src={trashCanWhite} alt="Delete" />
                            </button>
                        </div>
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
                        <div className='content__item'>
                            <p className='events__title'>Праздник:</p>

                            <button className="btn btn_icon" onClick={deleteEvent}>
                                <img src={trashCanWhite} alt="Delete" />
                            </button>
                        </div>
                        <p className='events__title'>{event.name}</p>
                        <p className='events__title'>Бюджет: {event.budget}</p>
                    </div>
                    );
                } else if (isEvent(event)) {
                    renderedEvent = (<div className="form">
                        <div className='content__item'>
                            <p className='events__title'>Мероприятие:</p>

                            <button className="btn btn_icon" onClick={deleteEvent}>
                                <img src={trashCanWhite} alt="Delete" />
                            </button>
                        </div>
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
        }
    }

    let renderEvents;

    if (visible == true) {
        renderEvents = <div className='events'>
            <HolidayPage date={day} sendData={onEventCreate} />
            <EventPage date={day} sendData={onEventCreate} />
            <NotePage date={day} sendData={onEventCreate} />
        </div>
    } else {
        renderEvents = <div className='events'> Пусто </div>
    }

    return (
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
                    {renderedHoliday}
                    {renderedEvent}
                    {renderedNotes}
                </div>
                <button onClick={addEvents}>Добавить</button>
                <button onClick={closeEvents}>Скрыть</button>
            </div>
            {renderEvents}
        </section>);
}

export default MyCalendar;