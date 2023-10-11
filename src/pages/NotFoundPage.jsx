import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <div className='wrap'>
            <h1>We can’t seem to find the page you’re looking for</h1>
            <p>Page not found 404</p>
            <ul>
                <li>
                    <Link to={"/"}>Home</Link>
                </li>
            </ul>
        </div>
    )
}

export default NotFoundPage