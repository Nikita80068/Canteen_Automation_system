

// export default FoodItem;
import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
    const store = useContext(StoreContext);

    if (!store) {
        console.error('StoreContext is not available');
        return null;
    }

    const { cartItems = {}, addToCart, removeFromCart, url = "" } = store;

    // Defensive checks
    if (!id || !name || !price || !description || !image) {
        console.error('Missing props in FoodItem:', { id, name, price, description, image });
        return null;
    }

    return (
        <div className='food-item'>
            <div className='food-item-img-container'>
                <img
                    className='food-item-image'
                    src={`${url}/images/${image}`}
                    alt={name}
                    onError={(e) => { e.target.src = assets.placeholder_image || ""; }}
                />
                {!cartItems[id] ? (
                    <img
                        className='add'
                        onClick={() => addToCart?.(id)}
                        src={assets.add_icon_white}
                        alt="Add"
                    />
                ) : (
                    <div className='food-item-counter'>
                        <img onClick={() => removeFromCart?.(id)} src={assets.remove_icon_red} alt="Remove" />
                        <p>{cartItems[id]}</p>
                        <img onClick={() => addToCart?.(id)} src={assets.add_icon_green} alt="Add More" />
                    </div>
                )}
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="Rating Stars" />
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">Rs {price}</p>
            </div>
        </div>
    );
};

export default FoodItem;
