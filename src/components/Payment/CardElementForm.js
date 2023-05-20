import React, { useState } from 'react'
import { CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import axios from 'axios'

const CardElementForm = () => {
  const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const handleSubmit = async (e) =>{
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

        if(!error){
            try {
                const {id} = paymentMethod
                const response = await axios.post("http://localhost:4000/payment", {
                    amount: 10000,
                    id
                })

                if(response.data.success){
                    console.log("Successful Payment")
                    setSuccess(true)
                }

            } catch (error) {
                console.log("Error", error)
            }
        }else {
            console.log(error.message)
        }
    }
    const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "black",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "black" },
			"::placeholder": { color: "black" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "black"
		}
	}
}


 return (
    <>
        {!success ? 
        <form onSubmit={handleSubmit}>
            <fieldset className='FormGroup'>
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS} />
                </div>
            </fieldset>
            <button className="payment-button">Pay</button>
        </form>
        :
        <div className="payment-success">
            <h2>Payment successful</h2>
            <h3 className='Thank-you'>Thank you for your patronage</h3>
        </div>
    }
    </>
  )
};

export default CardElementForm;