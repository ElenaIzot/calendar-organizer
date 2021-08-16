import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EventEvent } from './Models';

function EventPage(props: { date: Date, sendData: (event: EventEvent) => void }) {
    let [event, setEvent] = useState<EventEvent>({
        name: '',
        adress: '',
        time: ''
    });
    let [visible, setVisible] = useState(false);

    function showItems(): void {
        setVisible(true);
    };

    function closeItems(): void {
        setVisible(false);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.sendData(event);
        setEvent({
            name: '',
            adress: '',
            time: ''
        })
    };

    if (visible == true) {
        return (
            <div className='container-event'>
                <div className='events__item_add '>
                    <div className='events__title' onClick={closeItems}>
                        Добавить мероприятие
                    </div>
                </div>
                <form className="form" onSubmit={handleSubmit}>
                    <label className='form__item'>
                        <p className='events__title'>Название мероприятия:</p>
                        <input
                            className="form__input"
                            type="text"
                            placeholder='Название мероприятия'
                            value={event.name}
                            onChange={e => {
                                setEvent({ ...event, name: e.target.value });
                            }} />
                    </label>
                    <label className='form__item'>
                        <p className='events__title'>Адрес:</p>
                        <input
                            className="form__input"
                            type="text"
                            placeholder='Адрес'
                            value={event.adress}
                            onChange={e => {
                                setEvent({ ...event, adress: e.target.value });
                            }} />
                    </label>
                    <label className='form__item'>
                        <p className='events__title'>Время:</p>

                        <input className="form__input"
                            type="text"
                            placeholder='Время'
                            value={event.time}
                            onChange={e => {
                                setEvent({ ...event, time: e.target.value });
                            }} />
                    </label>
                    <input
                        className="btn"
                        type="submit"
                        value="Добавить" />
                </form>
            </div>
        )
    } else {
        return (
            <div className='container-event'>
                <div className='events__item_add'>
                    <div className='events__title' onClick={showItems}>
                        Добавить мероприятие
                    </div>
                </div>
            </div>
        )
    };
}

export default EventPage;


    // return (<>
    //     <div className='container-event'>
    //         <div className='events__item'>
    //             <p className='events__title'>Добавить мероприятие</p>
    //         </div>
    //         <form className="form" onSubmit={handleSubmit}>
    //             <label className='form__item'>
    //                 <p className='events__title'>Название мероприятия:</p>
    //                 <input
    //                     className="form__input"
    //                     type="text"
    //                     placeholder='Название мероприятия'
    //                     value={event.name}
    //                     onChange={e => {
    //                         setEvent({ ...event, name: e.target.value });
    //                     }} />
    //             </label>
    //             <label className='form__item'>
    //                 <p className='events__title'>Адрес:</p>
    //                 <input
    //                     className="form__input"
    //                     type="text"
    //                     placeholder='Адрес'
    //                     value={event.adress}
    //                     onChange={e => {
    //                         setEvent({ ...event, adress: e.target.value });
    //                     }} />
    //             </label>
    //             <label className='form__item'>
    //                 <p className='events__title'>Время:</p>

    //                 <input className="form__input"
    //                     type="text"
    //                     placeholder='Время'
    //                     value={event.time}
    //                     onChange={e => {
    //                         setEvent({ ...event, time: e.target.value });
    //                     }} />
    //             </label>
    //             <input
    //                 className="btn"
    //                 type="submit"
    //                 value="Добавить" />
    //         </form>
    //         {/* <Link to='/'>Вернуться к Календарю</Link> */}
    //     </div>
    // </>
    // );