import { useForm } from 'react-hook-form';
import "./Shipment.css";
import { useContext } from "react";
import { LoggedUserContext } from "../../App";

export default function Shipment() {
  const [loggedUser] = useContext(LoggedUserContext);
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      name: loggedUser.username,
      email: loggedUser.email
    }
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="shipment-form">
      <input placeholder="Your Name" type="text" id="name" {...register("name", { required: true })} />
      {errors.name && <p>Name is required</p>}

      <input placeholder="Your Email Address" type="email" id="email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
      {errors.email && <p>Enter a valid email address</p>}

      <input placeholder="Your Phone Number" type="tel" id="phone" {...register("phone", { required: true, pattern: /^[0-9]{11}$/ })} />
      {errors.phone && <p>Enter a valid 11-digit phone number</p>}

      <input placeholder="Your Password" type="password" id="password" {...register("password", { required: true, minLength: 6, pattern: /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{6,16}$/ })} />
      {errors.password && <p>Password must be at least 6 characters long and contain both letters and numbers</p>}

      <input placeholder="Confirm Your Password" type="password" id="confirmPassword" {...register("confirmPassword", { required: true, validate: (value) => value === watch('password') })} />
      {errors.confirmPassword && <p>Passwords do not match</p>}

      <input type="submit"/>
    </form>
  );
}
