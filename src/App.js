import Navbar from './components/Navbar';
import Container from './components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotal, getCartItems } from './features/cart/cartSlice';
import { useEffect } from 'react';
import Modal from './components/Modal';

const App = () => {

  const { cartItems, isLoading } = useSelector(state => state.cart);
  const { isOpen } = useSelector(state => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  useEffect(() => {

    dispatch(calculateTotal());
  }, [cartItems, dispatch]);

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <Container />
    </main>
  )
    ;
}
export default App;
