import React from 'react'
import "../styles/Footer.css"

const FooterComponent = () => {
    return (
        <div>
            <footer className='footer'>
                <span>UNI TEST | All Right Reserved &copy; {new Date().getFullYear()} </span>
            </footer>
        </div>
    )
}

export default FooterComponent