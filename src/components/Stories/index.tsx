import React, { useState, useEffect } from "react"
import { getStories } from "api";

const Stories = () => {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        getStories()
            .then(stories => {
                setStories(stories);
            })
    }, [])

    return <div>
        {stories.map(story => <div key={story.id}>

        </div>)}
    </div>
}



export default Stories