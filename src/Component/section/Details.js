import React, { Component } from 'react';
import { DataContext } from '../../ContextApi/Context';
import style from '../css/Details.module.css';
import { Link } from 'react-router-dom';

class Details extends Component {
    static contextType = DataContext

    state = {
        product: [],
    }

    getProduct = () => {
        if (this.props.match.params.id) {
            const res = this.context.products;
            const data = res.filter(item => {
                return item.id === this.props.match.params.id
            })
            this.setState({ product: data })
        }
    }

    componentDidMount() {
        this.getProduct();
    }
    render() {
        const { product } = this.state
        const { addCart } = this.context
        return (
            <div>
                {
                    product.map(item => (
                        <div className={style.details} key={item.id}>
                            <img src={item.src} alt="" />
                            <div className={style.box}>
                                <div className={style.row}>
                                    <h2>{item.name}</h2>
                                    <span>${item.price}</span>
                                </div>
                                <p>{item.description}</p>
                                <Link to="/product" className={style.back}>
                                    Go back Product
                                </Link>
                                <Link to="/cart" className={style.cart} onClick={() => addCart(item.id)}>
                                    Add to Cart
                                </Link>
                            </div>

                        </div>
                    ))
                }
            </div>

        );
    }
}

export default Details;