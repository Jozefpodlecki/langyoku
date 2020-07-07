import React, { useState, useEffect } from "react"
import style from './style.scss'
import { getCourse } from "api";
import { useParams } from "react-router-dom";

const Course = () => {
    const [courses, setCourses] = useState([]);
    const { id: idParam = null} = useParams();
    const id = Number(idParam);
    
    useEffect(() => {
        getCourse(id)
            .then(courses => {
                setCourses(courses);
            })
    }, [])

    return <div className={style.course}>
    </div>
}



export default Course