import React from 'react'
import styles from './style.module.css'

export const Navbar = () => {
    return (
        <section className = {styles.navBar} >
            <img src = "https://producthyre.com/images/logo.png" />
            <div>
                <div>Post Jobs</div>
                <div>Hire Product Managers!</div>
            </div>
            <button>Sign In</button>
            <button>Sign Out</button>
        </section>
    )
}
