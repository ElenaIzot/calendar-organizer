import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function NotePage() {
    let [valueHoliday, setValueHoliday] = useState();


    const handleSubmit = (e: any) => {
        e.preventDefault();
        alert('Отправленное имя: ' + valueHoliday);
    };


    const handleChange = (e: any) => {
        setValueHoliday(e.target.value)
        console.log(e.target.value)
    }

    return (<>
        <div className='events'>
            <div className='events__item'>
                <p className='events__title'>Добавить заметку</p>

            </div>


        <form className="form" onSubmit={handleSubmit}>
            <label className='events__title'>
                Название праздника:
                <input type="text" 
                 placeholder='Holiday'
                 value={valueHoliday}
                onChange={handleChange} />
            </label>
            <label className='events__title'>
                Бюджет:
                <input type="submit" 
                value={valueHoliday} 
                onChange={handleChange} />
            </label>

            <input type="submit" value="Отправить" />
        </form>
        <Link to='/'>Вернуться к Календарю</Link>
    </div>
    </>
    );
}

export default NotePage;