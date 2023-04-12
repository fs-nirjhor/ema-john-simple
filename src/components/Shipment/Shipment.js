import { useForm } from "react-hook-form";
import { useContext } from "react";
import { LoggedUserContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";

import "./Shipment.css";

const Shipment = () => {
  const [loggedUser] = useContext(LoggedUserContext);
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
    const databaseCart = getDatabaseCart();
    const order = {
      ...data,
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
    <form onSubmit={handleSubmit(onSubmit)} className="shipment-form">
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
  );
};

export default Shipment;
