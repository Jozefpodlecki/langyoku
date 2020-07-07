import React, { useState, useEffect } from "react"
import style from './style.scss'
import { getCourses } from "api";
import { Link } from "react-router-dom";

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getCourses()
            .then(courses => {
                setCourses(courses);
            })
    }, [])

    return <div className={style.courses}>
        {courses.map(({id, name}) => <div key={id} className={style.course}>
            <Link to={`/user/course/${id}`}>{name}</Link>
        </div>)}
    </div>
}



export default Courses