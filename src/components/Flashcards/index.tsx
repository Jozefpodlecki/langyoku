import React, { useState, useEffect } from "react"
import { getFlashcards } from "api";
import style from './style.scss'
import { useHistory } from "react-router-dom";

const Flashcards = () => {
    const [flashcards, setFlashcards] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getFlashcards()
            .then(flashcards => {
                setFlashcards(flashcards);
            })
    }, [])

    const startFlashcard = (id: number) => {
        history.push(`/user/flashcard/${id}`);
    }

    return <div className={style.container}>
        {flashcards.map(pr => <div onClick={() => startFlashcard(pr.id)} key={pr.id} className={style.flashcard}>
            {pr.name}
        </div>)}
    </div>
}



export default Flashcards