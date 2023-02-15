import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import { toOpen } from '../features/modal/modalSlice';

const Container = () => {

  const dispatch = useDispatch();
  const { cartItems, total, amount } = useSelector(state => state.cart);

  if (amount < 1) {
    return (
      <section className='cart'>
        <header>
          <h2>Your bag</h2>
          <h4 className='empty-cart'>is currently empty</h4>
        </header>
      </section>
    )
  }

  return (
    <section className='cart'>
      <header>
        <h2>Your bag</h2>
      </header>
      <div>
        {cartItems.map(item => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <div>
        <hr />
        <div className='cart-total'>
          <h4>total <span>${total.toFixed(2)}</span></h4>
        </div>
        <button className='btn clear-btn' onClick={()=> dispatch(toOpen())}>clear cart</button>
      </div>
    </section>
  )

}

export default Container;
