import { useState } from 'react';
import { EventHoliday } from './Models';

function Holiday(props: { date: Date, sendData: (event: EventHoliday) => void }) {
    let [holiday, setHoliday] = useState<EventHoliday>({
        name: '',
        budget: '',
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.sendData(holiday);
        setHoliday({
            name: '',
            budget: '',
        })
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Добавить праздник</label>
                <input
                    type="text"
                    placeholder='Введите название праздника'
                    className="form-control"
                    value={holiday.name}
                    onChange={e => {
                        setHoliday({ ...holiday, name: e.target.value });
                    }} />
            </div>

            <div className="mb-3">
                <label className="form-label">Бюджет</label>
                <input
                    type="text"
                    placeholder='Введите планируемый бюджет'
                    className="form-control"
                    value={holiday.budget}
                    onChange={e => {
                        setHoliday({ ...holiday, budget: e.target.value });
                    }} />
            </div>
            <div className="form__btns mb-3">
                <button type="submit" className="form__button btn btn-primary">Отправить</button>
                <button type="submit" className="form__button btn btn-primary">Отмена</button>
            </div>
        </form>
    )
}
export default Holiday;