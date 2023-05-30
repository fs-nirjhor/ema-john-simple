import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { LoggedUserContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";

import "./Shipment.css";
import Payment from "../Payment/Payment";

const Shipment = () => {
  const [loggedUser] = useContext(LoggedUserContext);
  const [formData, setFormData] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: loggedUser.email,
      name: loggedUser.username,
    },
  });
  const onSubmit = (data) => {
    setFormData(data);
  };
  const handlePayment = (paymentId) => {
    const databaseCart = getDatabaseCart();
    const order = {
      ...formData,
      paymentId,
      order: databaseCart,
      time: new Date(),
    };
    fetch(`https://ema-john-fsn-server.onrender.com/addOrder`, {
      method: "POST",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(order) 
    })
    .then(res => res.json())
    .then(data => {
      if (data?.insertedId) {
      alert("Order Successful");
      processOrder();
      } else {alert("Order Failed")}
    })
    .catch(error => console.log(error.message));
  };

  return (
   <div >
    <form onSubmit={handleSubmit(onSubmit)} className="shipment-form" style={{display: formData ? "none" : "block"}}>
      <input
        type="text"
        placeholder="Your Name"
        {...register("name", { required: true })}
      />
      {errors.name && <span className="error-text"> Name is required </span>}
      <input
        type="email"
        placeholder="Your Email"
        {...register("email", {
          required: true,
        })}
      />
      {errors.email && <span className="error-text"> Email is required </span>}

      <input
        type="text"
        placeholder="Your Address"
        {...register("address", { required: true })}
      />
      {errors.address && (
        <span className="error-text">Address is Required</span>
      )}
      <input
        type="tel"
        placeholder="Mobile Number"
        {...register("number", {
          required: true,
          minLength: 11,
        })}
      />
      {errors.number && (
        <span className="error-text">Valid Mobile Number is Required</span>
      )}

      <input type="submit" value="Submit" />
    </form>
    <div style={{display: formData ? "block" : "none"}}>
      <Payment handlePayment={handlePayment}/>
    </div>
    </div>
  );
};

export default Shipment;
