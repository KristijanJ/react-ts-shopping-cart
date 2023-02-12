import { ListGroup, Offcanvas } from 'react-bootstrap';
import { useShoppingCartContext } from '../context/ShoppingCartContext';
import { CartItem } from './CartItem';
import storeItems from '../data/items.json';
import { formatCurrency } from '../utilities/formatCurrency';

export const CartSidebar = () => {
    const { isOpen, closeCart, cartItems } = useShoppingCartContext();

    return (
        <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart items</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <>
                    <ListGroup variant="flush">
                        {cartItems.map(cartItem => <CartItem key={cartItem.id} {...cartItem} />)}
                    </ListGroup>

                    <div className="p-3 text-end fs-5 fw-semibold">
                        Total: {
                            formatCurrency(
                                cartItems.reduce((total, cartItem) => {
                                    const item = storeItems.find(i => i.id === cartItem.id)
                                    return total + (item?.price || 0) * cartItem.quantity
                                }, 0)
                            )
                        }
                    </div>
                </>
            </Offcanvas.Body>
        </Offcanvas>
    );
};
