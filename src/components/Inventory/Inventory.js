import fakeData from "../../fakeData";

const Inventory = () => {
  const handleAdd = () => {
    fetch(`http://localhost:4000/addProduct`, {
      method: "POST",
      body: JSON.stringify(fakeData),
  		headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.log(error.message));
  };
return (
  <div>
    <h1>Inventory is loading...</h1>
    <button onClick = {handleAdd} > Add All</button>
  </div>
);
};

export default Inventory;