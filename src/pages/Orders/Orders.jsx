import React ,{useContext , useState ,useEffect} from 'react'
import LayOut from '../../components/LayOut/LayOut'
import { db } from '../../Utility/firebase';
import { DataContext } from '../../components/DataProvider/DataProvider';
import classes from './Orders.module.css';
import ProductCard from '../../components/Product/ProductCard';

 const Orders = () => {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([ ]);
    }
  }, [user]); // Added `user` to dependencies

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.order__container}>
          <h2>Your Orders</h2>
          {orders?.length == 0 && <div style={{padding:"20px"}}>
            You have not ordered yet.
          </div>}
          {/* Ordered items */}
          <div>
            {orders?.map((eachOrder) => (
              <div key={eachOrder.id}>
                <hr />
                <p>Order ID: {eachOrder?.id}</p>
                {eachOrder?.data?.basket?.map((order) => (
                  <ProductCard
                    flex={true}
                    product={order}
                    key={order.id}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Orders;