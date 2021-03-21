import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../ContextApi/Context';
import style from '../css/Products.module.css';
class Products extends Component {
    static contextType = DataContext

    render() {
        const { products } = this.context;
        return (
            <div className={style.product}>
                {
                    products.map(product => (
                        <div className={style.card} key={product.id}>
                            <Link to={`/product/${product.id}`} key={product.id}>
                                <img src={product.src} alt="" />
                            </Link>
                            <div className={style.content}>
                                <h3>
                                    <Link to={`/product/${product.id}`} key={product.id}>
                                        {product.name}
                                    </Link>
                                </h3>
                                <span>${product.price}</span>
                                <p>{product.description}</p>
                                <button onClick={() => { this.context.addCart(product.id) }}>Add to Cart</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default Products;