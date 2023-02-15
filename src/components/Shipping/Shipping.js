import React from 'react';

const Shipping = (props) => {
  const {productKey} = props;
  const daysStyle = {color:"green"};
  const rateStyle = {color:"grey"};
  const shippingTypes = [
    {name:'Free', days: '8-10', rate: 0},
    {name:'Regular', days: '5-7', rate: 3.99},
    {name:'Standard', days: '2-4', rate: 7.99}
    ];
return (
<>
  <h5>Shipping options</h5>
{
  shippingTypes.map((type,i) => <div key={i}>
    <input type="radio" name={productKey} /> <b style={daysStyle}>{type.days} business days</b>
    <br /> <small style={rateStyle}>${type.rate} - {type.name} Shipping</small>
  </div>
  )
}

</>
);
};

export default Shipping;