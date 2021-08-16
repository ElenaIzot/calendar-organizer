import { useState } from 'react';
import Calendar from "react-calendar";
import EventPage from './EventPage';
import HolidayPage from './HolidayPage';
import {
    CalendarEvent, getEventsFronStorage, isEvent,
    isHoliday, isNote, saveEventsToStorage
} from './Models';


function MyCalendar() {
    const [day, onClickDay] = useState(new Date());
    const [componentEvents, setComponentEvents] = useState<Array<CalendarEvent>>(getEventsFronStorage(day));
    const [value, onChange] = useState(new Date());

    const onEventCreate = (event: CalendarEvent) => {
        const events = [...componentEvents, event];
        saveEventsToStorage(day, events);
        setComponentEvents(events);
        onClickDay(new Date());
    }


    let renderedHoliday, renderedEvent, renderedNotes;

    for (const event of componentEvents) {
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
                        <p className='events__title'>Дата: {day.toLocaleString()}</p>
                    </div>
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



//     if (visible == true) {
//         return (
//             <div className="wrap">
//                 <p className="title">Dropdown</p>
//                 <div className="dropdown">
//                     <div className="dropdown__current-item">{value}</div>
//                     <button className="btn-arrow dropdown__btn" onClick={closeItems}>
//                         <span className="btn-arrow__arrow-up"></span></button>
//                 </div>
//                 <div className="dropdown__dropdown-visible">
//                     <ul className="dropdown__list">
//                         {listItems}
//                     </ul>
//                 </div>
//             </div>)
//     } else {
//         return (
//             <div className="wrap">
//                 <p className="title">Dropdown</p>
//                 <div className="dropdown">
//                     <div className="dropdown__current-item">{value}</div>
//                     <button className="btn-arrow dropdown__btn" onClick={showItems}>
//                         <span className="btn-arrow__arrow-down"></span></button>
//                 </div>
//             </div>
//         )
//     }
// }

export default MyCalendar;

// const savedEvents = localStorage.setItem(`${changeDay}`, JSON.stringify(events));
// const events1: Array<CalendarEvent> = JSON.parse(localStorage.get('2021-08-16') || '[]')