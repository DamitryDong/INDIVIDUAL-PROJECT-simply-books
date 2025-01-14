'use client';

import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useCart } from '../../components/cartContext';
import { useAuth } from '../../utils/context/authContext';
import { createBook, updateBook } from '../../api/bookData';

function CartPage() {
  // Access cart items from context that we made which will hold all the data until we click delete.
  const { cartItems, setCartItems, removeFromCart } = useCart();
  const { user } = useAuth();

  const [purchaseMessage, setPurchaseMessage] = useState('');

  const handleRemoveItem = () => {
    setCartItems([]);
  };

  const handleRemoveOneItem = (firebaseKey) => {
    removeFromCart(firebaseKey); // Check the useCart function to see how, but this just removes one item with that firebaseKey
  };

  const handleBuyItem = () => {
    const payload = [];

    cartItems.forEach((item) => {
      payload.push({
        description: item.description,
        image: item.image,
        price: item.price,
        sale: item.sale,
        title: item.title,
        author_id: item.author_id,
        publish: 'copied',
        uid: user.uid,
      });
    });

    payload.forEach((payloadItem) => {
      createBook(payloadItem).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateBook(patchPayload).then(setCartItems([]));
        setPurchaseMessage('YAY!!! go checkout your near books!!');
      });
    });
  };

  const totalCost = cartItems.reduce((total, item) => total + parseFloat(item.price || 0), 0);

  return (
    <div>
      <h2>Your Cart</h2>
      <h2>Total: ${totalCost} </h2>
      <Button variant="danger" onClick={handleRemoveItem}>
        Clear Cart
      </Button>
      <Button variant="primary" onClick={handleBuyItem}>
        Buy
      </Button>
      {purchaseMessage && <p className="text-success">{purchaseMessage}</p>}
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
                  Removed
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
