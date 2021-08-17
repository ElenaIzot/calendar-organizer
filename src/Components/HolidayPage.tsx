import { EventType } from '@testing-library/react';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EventHoliday } from './Models';

function HolidayPage(props: { date: Date, sendData: (event: EventHoliday) => void }) {
    let [holiday, setHoliday] = useState<EventHoliday>({
        name: '',
        budget: '',
    });
    let [visible, setVisible] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.sendData(holiday);
        setHoliday({
            name: '',
            budget: '',
        })
    };

    function showItems(): void {
        setVisible(true);
    };

    function closeItems(): void {
        setVisible(false);
    };

    function cancelAdding(): void {
        setVisible(false);
    };


    if (visible == true) {
        return (
            <div className='container-event'>
                <div className='events__item_add '>
                    <div className='events__title' onClick={closeItems}>
                        Добавить праздничный день
                    </div>
                </div>
                <form className="form"
                    onSubmit={handleSubmit}>
                    <label className='form__item'>
                        <p className='events__title'>Название праздника:</p>
                        <input className="form__input"
                            type="text"
                            placeholder='Название праздника'
                            value={holiday.name}
                            onChange={e => {
                                setHoliday({ ...holiday, name: e.target.value });
                            }}
                        />
                    </label  >
                    <label className='form__item'>
                        <p className='events__title'>Бюджет:</p>
                        <input className="form__input"
                            type="text"
                            placeholder='Введите количество денег'
                            value={holiday.budget}
                            onChange={e => {
                                setHoliday({ ...holiday, budget: e.target.value });
                            }}
                        />
                    </label>
                    <input
                        className="btn"
                        type="submit"
                        value="Добавить"
                    />
                     <input
                        className="btn"
                        name="cancel"
                        type="button"
                        value="Отменить"
                        onClick={cancelAdding}
                    />
                </form>
            </div>
        )
    } else {
        return (
            <div className='container-event'>
                <div className='events__item_add'>
                    <div className='events__title' onClick={showItems}>
                        Добавить праздничный день
                    </div>
                </div>
            </div>
        )
    };




    // return (<>
    //         <div className='container-event'>
    //             <div className='events__item'>
    //                 <button className='events__title' onClick={closeItems}>Добавить праздничный день</button>
    //             </div>

    //             <form className="form"
    //                 onSubmit={handleSubmit}>
    //                 <label className='form__item'>
    //                     <p className='events__title'>Название праздника:</p>
    //                     <input className="form__input"
    //                         type="text"
    //                         placeholder='Название праздника'
    //                         value={holiday.name}
    //                         onChange={e => {
    //                             setHoliday({ ...holiday, name: e.target.value });
    //                         }}
    //                     />
    //                 </label  >
    //                 <label className='form__item'>
    //                     <p className='events__title'>Бюджет:</p>
    //                     <input className="form__input"
    //                         type="text"
    //                         placeholder='Введите количество денег'
    //                         value={holiday.budget}
    //                         onChange={e => {
    //                             setHoliday({ ...holiday, budget: e.target.value });
    //                         }}
    //                     />
    //                 </label>
    //                 <input
    //                     className="btn"
    //                     type="submit"
    //                     value="Добавить"
    //                 />
    //             </form>
    //             {/* <Link to='/'>Вернуться к Календарю</Link> */}
    //         </div>
    //     </>
    //     );
}

export default HolidayPage;