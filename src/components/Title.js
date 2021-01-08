import React from 'react'
import {Link} from 'react-router-dom';

function Title({data}) {
    let images = data.map(image=> {
        return (
            <li key={image.id}>
                <Link to={`/${image.id}`} className="text-decoration-none"> {image.title}</Link>
            </li>
        )
    });
    return (
        <>
        <div className="row mt-3 justify-content-center">
        <ul className="list-unstyled pl-0">
            {images}
        </ul>
        </div>
        </>
    )
}

export default Title;