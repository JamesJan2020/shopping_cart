import React, { Component } from 'react';
import Menu from './svg/bars-solid.svg';
import Close from './svg/times-solid.svg';
import CartIcon from './svg/luggage-cart-solid.svg';
import { Link } from 'react-router-dom';
import style from './css/Header.module.css'
import { DataContext } from '../ContextApi/Context'

class Header extends Component {
    
    static contextType = DataContext

    state = {
        toggle: false
    }
    menuToggle = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }

    render() {
        const { toggle } = this.state;
        const { cart } = this.context
        return (
            <header>
                <div className={style.menu} onClick={this.menuToggle}>
                    <img src={Menu} width={25} alt="" />
                </div>

                <div className={style.logo}>
                    <h1><Link to='/'>Hiking</Link></h1>
                </div>
                <nav>
                    <ul className={toggle ? style.toggle : null}>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/product'>Product</Link></li>
                        <li><Link to='/contact'>Contact</Link></li>
                        <li><Link to='/about'>About</Link></li>
                        <li><Link to='/login'>Login/Register</Link></li>
                        <li className={style.close} onClick={this.menuToggle}>
                            <img src={Close} width={25} alt="" />
                        </li>
                    </ul>
                    <div className={style.nav_cart}>
                        <span>{cart.length}</span>
                        <Link to='/cart'>
                            <img src={CartIcon} width={30} alt="" />
                        </Link>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;