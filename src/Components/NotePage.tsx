import React from 'react';
import { useState } from 'react';
import { EventNote } from './Models';

function NotePage(props: {
    date: Date,
    sendData: (event: EventNote) => void
}) {

    let [note, setNote] = useState<EventNote>({
        name: '',
        text: '',
    });
    let [visible, setVisible] = useState(false);

    function showItems(): void {
        setVisible(true);
    };

    function closeItems(): void {
        setVisible(false);
    };

    function cancelAdding(): void {
        setVisible(false);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.sendData(note);
        setNote({
            name: '',
            text: '',
        })
    };

    if (visible == true) {
        return (
            <div className='container-event'>
                <div className='events__item_add '>
                    <div className='events__title' onClick={closeItems}>
                        Добавить заметку
                    </div>
                </div>
                <form className="form" onSubmit={handleSubmit}>
                    <label className='form__item'>
                        <p className='events__title'>Название заметки:</p>
                        <input
                            className="form__input"
                            type="text"
                            placeholder='Название заметки'
                            value={note.name}
                            onChange={e => {
                                setNote({ ...note, name: e.target.value });
                            }} />
                    </label>
                    <label className='form__item'>
                        <p className='events__title'>Текст:</p>
                        <textarea
                            className="form__input"
                            placeholder='Текст'
                            value={note.text}
                            onChange={e => {
                                setNote({ ...note, text: e.target.value });
                            }} />
                    </label>

                    <input
                        className="btn"
                        type="submit"
                        value="Добавить" />
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
                        Добавить заметку
                    </div>
                </div>
            </div>
        )
    };
}

export default NotePage;