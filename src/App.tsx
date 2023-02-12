import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ShoppingCartProvider } from './context/ShoppingCartContext';

import { Home } from './pages/Home';
import { Store } from './pages/Store';
import { About } from './pages/About';

import { Navbar } from './components/Navbar';
import { CartSidebar } from './components/CartSidebar';

function App() {
    return (
        <ShoppingCartProvider>
            <Navbar />
            <Container className="mb-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </Container>

            <CartSidebar />
        </ShoppingCartProvider>
    );
}

export default App;
