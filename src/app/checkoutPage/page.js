'use client';

import React, { useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useCart } from '../../components/cartContext';
import { useAuth } from '../../utils/context/authContext';
import { createBook, updateBook } from '../../api/bookData';

function CartPage() {
  const { cartItems, setCartItems, removeFromCart } = useCart();
  const { user } = useAuth();

  const [purchaseMessage, setPurchaseMessage] = useState('');

  const handleRemoveItem = () => {
    setCartItems([]);
  };

  const handleRemoveOneItem = (firebaseKey) => {
    removeFromCart(firebaseKey);
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
        updateBook(patchPayload).then(() => {
          setCartItems([]);
          setPurchaseMessage('YAY!!! Go check out your new books!');
        });
      });
    });
  };

  const totalCost = cartItems.reduce((total, item) => total + parseFloat(item.price || 0), 0);

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Checkout</h1>
      <Row>
        <Col md={8}>
          <h3>Your Items</h3>
          {cartItems.length === 0 ? (
            <p className="text-muted">Your cart is empty.</p>
          ) : (
            <div className="d-flex flex-wrap">
              {cartItems.map((item) => (
                <Card key={item.firebaseKey} style={{ width: '15rem', margin: '10px' }}>
                  <Card.Img variant="top" src={item.image} alt={item.title} style={{ height: '80%', objectFit: 'cover' }} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>${item.price}</Card.Text>
                    <Button variant="outline-danger" onClick={() => handleRemoveOneItem(item.firebaseKey)}>
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </Col>
        <Col md={4}>
          <Card className="p-3 shadow">
            <h3>Order Summary</h3>
            <p>Total Items: {cartItems.length}</p>
            <h5>
              Subtotal: <strong>${totalCost.toFixed(2)}</strong>
            </h5>
            <h5>
              Tax (10%): <strong>${(totalCost * 0.1).toFixed(2)}</strong>
            </h5>
            <h4 style={{ borderTop: '2px solid gray', paddingTop: '5px' }}>
              Total Cost: <strong>${(totalCost * 1.1).toFixed(2)}</strong>
            </h4>
            <Button variant="danger" className="w-100 my-2" onClick={handleRemoveItem} disabled={cartItems.length === 0}>
              Clear Cart
            </Button>
            <Button variant="success" className="w-100" onClick={handleBuyItem} disabled={cartItems.length === 0}>
              Buy Now
            </Button>
            {purchaseMessage && <p className="text-success mt-3">{purchaseMessage}</p>}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CartPage;
