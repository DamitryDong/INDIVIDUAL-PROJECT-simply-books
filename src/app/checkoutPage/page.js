'use client';

import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useCart } from '../../components/cartContext';

function CartPage() {
  // Access cart items from context that we made which will hold all the data until we click delete.
  const { cartItems, setCartItems, removeFromCart } = useCart();

  const handleRemoveItem = () => {
    setCartItems([]);
  };

  const handleRemoveOneItem = (firebaseKey) => {
    removeFromCart(firebaseKey); // Check the useCart function to see how, but this just removes on item with that firebasekey
  };

  const totalCost = cartItems.reduce((total, item) => total + parseFloat(item.price || 0), 0);

  return (
    <div>
      <h2>Your Cart</h2>
      <h2>Total: ${totalCost} </h2>
      <Button variant="danger" onClick={handleRemoveItem}>
        Clear Cart
      </Button>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="d-flex flex-wrap">
          {cartItems.map((item) => (
            <Card key={item.firebaseKey} style={{ width: '9rem', margin: '5px' }}>
              <Card.Img variant="top" src={item.image} alt={item.title} style={{ height: '200px' }} />
              <Card.Body>
                <p>${item.price}</p>
                <Button variant="danger" onClick={() => handleRemoveOneItem(item.firebaseKey)}>
                  Remove
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default CartPage;
