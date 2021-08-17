import React from 'react';
import { useState } from 'react';
import { EventNote } from './Models';

function Note(props: {
    date: Date,
    sendData: (event: EventNote) => void
}) {

    let [note, setNote] = useState<EventNote>({
        name: '',
        text: '',
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.sendData(note);
        setNote({
            name: '',
            text: '',
        })
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label"> Добавить заметку</label>
                <input
                    type="text"
                    placeholder='Введите название заметки'
                    className="form-control"
                    value={note.name}
                    onChange={e => {
                        setNote({ ...note, name: e.target.value });
                    }} />
            </div>

            <div className="mb-3">
                <label className="form-label">Текст</label>
                <textarea className="form-control"
                    value={note.text} onChange={e => {
                        setNote({ ...note, text: e.target.value });
                    }}></textarea>
            </div>
            <div className="form__btns mb-3">
                <button type="submit" className="form__button btn btn-primary">Отправить</button>
                <button type="submit" className="form__button btn btn-primary">Отмена</button>
            </div>

        </form >
    )
}

export default Note;