import { useForm } from "react-hook-form";
import { useContext } from "react";
import { LoggedUserContext } from "../../App";
import "./Shipment.css";

const Shipment = () => {
  const [loggedUser, setLoggedUser] = useContext(LoggedUserContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: loggedUser.email,
      username: loggedUser.username,
    },
  });
  const onSubmit = (values) => console.log(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="shipment-form">
      <input
        type="email"
        placeholder="Your Email"
        {...register("email", {
          required: true,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address"
          }
        })}
      />
      {errors.email && <span className="error-text">{errors.email.message}</span>}

      <input
        type="text"
        placeholder="Your Name"
        {...register("username", { required: true, maxLength: 20 })}
      />
      {errors.username && <span className="error-text">invalid name</span>}
      <input
        type="tel"
        placeholder="Mobile Number"
        {...register("number", {
          required: true, minLength: 11
        })}
      />
      {errors.number && <span className="error-text">invalid number</span>}
      <input
        type="password"
        placeholder="Your Password"
        {...register("password", {
          required: true, 
          minLength: 6,
          pattern: {
            value: /^(?=.*\d)[a-zA-Z0-9!#@$%&?]{6,16}$/i,
            message: "invalid password"
          }
        })}
      />
      {errors.password && <span className="error-text">{errors.password.message}</span>}

      <input type="submit" value="Submit" />
    </form>
  );
};

export default Shipment;

/*
import React from 'react';
import { useForm } from 'react-hook-form';

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="First name" {...register("First name", {required: true, maxLength: 80})} />
      <input type="text" placeholder="Last name" {...register("Last name", {required: true, maxLength: 100})} />
      <input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
      <input type="tel" placeholder="Mobile number" {...register("Mobile number", {required: true, minLength: 6, maxLength: 12})} />
      <select {...register("Title", { required: true })}>
        <option value="Mr">Mr</option>
        <option value="Mrs">Mrs</option>
        <option value="Miss">Miss</option>
        <option value="Dr">Dr</option>
      </select>

      <input {...register("Developer", { required: true })} type="radio" value="Yes" />
      <input {...register("Developer", { required: true })} type="radio" value="No" />

      <input type="submit" />
    </form>
  );
}
*/
