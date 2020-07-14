import React, { useState, useEffect } from "react"
import style from './style.scss'
import { getCourses } from "api";
import { Link } from "react-router-dom";
import { useProfile } from "ProfileContext";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [profile] = useProfile();

    useEffect(() => {
        const languageId = profile.language.id;

        if(languageId) {
            getCourses({
                languageId
            })
                .then(courses => {
                    setCourses(courses);
                })
        }
        
    }, [profile])

    return <div className={style.courses}>
        {courses.map(({id, name}) => <div key={id} className={style.course}>
            <Link to={`/user/course/${id}`}>{name}</Link>
        </div>)}
    </div>
}



export default Courses