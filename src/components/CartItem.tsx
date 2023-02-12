import { FC, useMemo } from 'react';
import { Button, Col, ListGroup, Row } from 'react-bootstrap';
import { useShoppingCartContext } from '../context/ShoppingCartContext';

import storeItems from '../data/items.json';
import { formatCurrency } from '../utilities/formatCurrency';

interface Props {
    id: number;
    quantity: number;
}

export const CartItem: FC<Props> = ({ id, quantity }) => {
    const storeItem = storeItems.find((storeItem) => storeItem.id === id);
    if (!storeItem) {
        return null;
    }

    const { removeFromCart } = useShoppingCartContext();

    const formattedPrice: string = useMemo(() => {
        return formatCurrency(storeItem.price * quantity);
    }, [storeItem.price]);

    return (
        <ListGroup.Item>
            <Row>
                <Col md="auto">
                    <img
                        src={storeItem.imgUrl}
                        style={{
                            width: '100px',
                            height: '70px',
                            objectFit: 'cover'
                        }}
                    />
                </Col>
                <Col className="align-self-center">
                    <div className="fw-semibold">
                        {storeItem.name} <span style={{ fontSize: '12px' }}>x{quantity}</span>
                    </div>
                    <div style={{ fontSize: '14px' }}>
                        {formattedPrice}
                    </div>
                </Col>
                <Col lg="2" className="align-self-center text-end">
                    <Button variant="danger" onClick={() => removeFromCart(id)}>
                        &times;
                    </Button>
                </Col>
            </Row>
        </ListGroup.Item>
    );
};
