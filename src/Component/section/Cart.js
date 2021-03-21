import React, { Component } from 'react';
import { DataContext } from '../../ContextApi/Context';
import style from '../css/Details.module.css';
import { Link } from 'react-router-dom';


class Cart extends Component {
    static contextType = DataContext;

    componentDidMount() {
        this.context.getTotal();
    }
    render() {
        const { cart, reduceCount, addCount, removeProduct, total } = this.context
        if (cart.length === 0) {
            return <h2 style={{ textAlign: "center" }}>還未加入商品</h2>
        }
        else {
            return (
                <div>
                    <Link to="/product" className={style.cart_Back}>
                        Go back Product
                                </Link>
                    {
                        cart.map(item => (
                            <div className={style.details} key={item.id}>
                                <img src={item.src} alt="" />
                                <div className={style.box}>
                                    <div className={style.row}>
                                        <h2>{item.name}</h2>
                                        <span>${item.price * item.count}</span>
                                    </div>
                                    <p>{item.description}</p>
                                    <div className={style.amount}>
                                        <button className={style.count} onClick={() => reduceCount(item.id)}>-</button>
                                        <span>{item.count}</span>
                                        <button className={style.count} onClick={() => addCount(item.id)}>+</button>
                                    </div>
                                </div>
                                <div className={style.delete} onClick={() => removeProduct(item.id)}>X</div>
                            </div>
                        ))
                    }
                    <div className={style.total}>
                        <h2>共計${total}</h2>
                        <Link to="/payment">結帳</Link>
                    </div>
                </div >
            );
        }
    }
}

export default Cart;