import React, { Component } from 'react';

export const DataContext = React.createContext();

export class DataProvider extends Component {
    state = {
        products: [
            {
                "id": "1",
                "name": "耐熱耐冷山貓水壺",
                "src": "https://picsum.photos/300/300?image=11",
                "description": "背帶上加裝扣環，當作攜帶時的把手，從此不用再擔心瓶蓋遺失的問題了防濺蓋(中蓋)在瓶身傾斜時防止內部的水潑灑出來",
                "price": 650,
                "count": 1
            },
            {
                "id": "2",
                "name": "Mammut 登山鞋",
                "src": "https://picsum.photos/300/300?image=12",
                "description": "SALOMON最暢銷戶外鞋款X-ULTRA，搭載下坡控制技術中底，更能穩定面對技術型地形。輕量化、穩定中底與下坡控制技術中底，是戶外愛好者快速登山健行第一選擇。",
                "price": 5580,
                "count": 1
            },
            {
                "id": "3",
                "name": "Caravan 戶外防水登山鞋",
                "src": "https://picsum.photos/300/300?image=13",
                "description": "專為女性設計的登山健行鞋，考慮到女性纖細的腳，鞋口的內裏與泡棉材料，選用較柔軟舒適的材質。",
                "price": 4580,
                "count": 1
            },
            {
                "id": "4",
                "name": "SALOMON 輕量防水中筒登山鞋",
                "src": "https://picsum.photos/300/300?image=14",
                "description": "SALOMON最暢銷戶外鞋款X-ULTRA，搭載下坡控制技術中底，更能穩定面對技術型地形",
                "price": 5890,
                "count": 1
            },
            {
                "id": "5",
                "name": "Caravan 中筒防水登山鞋",
                "src": "https://picsum.photos/300/300?image=15",
                "description": "專為登山的初學者所設計的Caravan shoes代表作，亞洲人腳型設計的鞋體，為了讓腳趾有活動的餘裕，採用3E的寬楦設計採用GTX防水薄膜，適合登山健行戶外活動",
                "price": 5650,
                "count": 1
            },
            {
                "id": "6",
                "name": "Osprey 男款小鷹輕量登山背包",
                "src": "https://picsum.photos/300/300?image=16",
                "description": "內嵌式輕量骨架，超透氣背板長時間背負不悶熱，網面透氣肩帶與腰帶，可依照不同的身長調節",
                "price": 6480,
                "count": 1
            },
            {
                "id": "7",
                "name": "EX2 Polartec 保暖帽",
                "src": "https://picsum.photos/300/300?image=17",
                "description": "帽沿簡潔，而不易變形，堅固耐用抓，絨面料，做工細膩，車線整齊，有彈力拉伸，舒適保暖帽後反光織帶，增加夜間戶外活動安全性",
                "price": 680,
                "count": 1
            },
            {
                "id": "8",
                "name": "One Boy智能控溫加熱防水衝鋒外套",
                "src": "https://picsum.photos/300/300?image=18",
                "description": "深藍色鈕扣式可拆，毛領三檔控溫/加熱快/防風/防潑水發熱區，拉鍊＋魔鬼氈拆卸設計",
                "price": 2950,
                "count": 1
            },
            {
                "id": "9",
                "name": "One Boy 機能防潑水衝鋒衣",
                "src": "https://picsum.photos/300/300?image=19",
                "description": "外層防潑水實測，嚴選面料材質，內層透氣科技網布材質，防沾黏設計使用最新升級科技纖維布料且內裡360度循環透氣網布",
                "price": 1200,
                "count": 1
            },
        ],
        cart: [],
        total: 0
    };

    addCart = (id) => {
        const { products, cart } = this.state;
        const chkCount = cart.every(item => {
            return item.id !== id
        });
        // console.log(chkCount)
        if (chkCount) {
            const data = products.filter(product => {
                return product.id === id
            });
            // console.log(data);
            this.setState({ cart: [...cart, ...data] })
        }
        else { alert("商品已加入購物車") }
        //console.log(cart);
    };

    reduceCount = id => {
        const { cart } = this.state;

        cart.forEach(item => {
            if (item.id === id) {
                item.count === 1 ? item.count = 1 : item.count -= 1;
            }
        });
        this.setState({ cart: cart });
        this.getTotal();
    };

    addCount = id => {
        const { cart } = this.state;

        cart.forEach(item => {
            if (item.id === id) {
                item.count += 1
            }
        });
        this.setState({ cart: cart });
        this.getTotal();

    };


    removeProduct = id => {
        if (window.confirm("確定刪除此商品嗎?")) {
            const { cart } = this.state;

            cart.forEach((item, index) => {
                if (item.id === id) {
                    cart.splice(index, 1)
                }
            });

            this.setState({ cart: cart })
            this.getTotal();
        }

    };

    getTotal = () => {
        const { cart } = this.state;
        const res = cart.reduce((prev, item) => {
            return prev + (item.price * item.count);
        }, 0)
        this.setState({ total: res })
    }

    componentDidUpdate() {
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
    }
    componentDidMount() {
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if (dataCart !== null) {
            this.setState({ cart: dataCart })
        };
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if (dataTotal !== null) {
            this.setState({ total: dataTotal })
        }
    }




    render() {
        const { products, cart, total } = this.state
        const { addCart, reduceCount, addCount, removeProduct, getTotal } = this;
        return (
            <DataContext.Provider value={{ products, addCart, cart, reduceCount, addCount, removeProduct, total, getTotal }}>
                {this.props.children}
            </DataContext.Provider>
        )
    }

}