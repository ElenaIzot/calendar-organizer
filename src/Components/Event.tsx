import { useState } from 'react';
import { EventEvent } from './Models';

function Event(props: {
    date: Date,
    sendData: (event: EventEvent) => void
}) {
    let [event, setEvent] = useState<EventEvent>({
        name: '',
        adress: '',
        time: ''
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.sendData(event);
        setEvent({
            name: '',
            adress: '',
            time: ''
        })
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Добавить мероприятие</label>
                <input
                    type="text"
                    placeholder='Название мероприятия'
                    className="form-control"
                    value={event.name}
                    onChange={e => {
                        setEvent({ ...event, name: e.target.value });
                    }} />
            </div>
            <div className="mb-3">
                <label className="form-label">Адрес</label>
                <input
                    type="text"
                    placeholder='Введите адрес'
                    className="form-control"
                    value={event.adress}
                    onChange={e => {
                        setEvent({ ...event, adress: e.target.value });
                    }} />
            </div>
            <div className="mb-3">
                <label className="form-label">Время</label>
                <input
                    type="text"
                    placeholder='Введите время'
                    className="form-control"
                    value={event.time}
                    onChange={e => {
                        setEvent({ ...event, time: e.target.value });
                    }} />
            </div>
            <div className="form__btns mb-3">
                <button type="submit" className="form__button btn btn-primary">Отправить</button>
                <button type="submit" className="form__button btn btn-primary">Отмена</button>
            </div>
        </form>
    )
}

export default Event;