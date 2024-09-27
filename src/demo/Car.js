import { useState } from "react";
function Car() {
    //đặt state
    const [car, setCar] = useState (
        {
            brand: "Ford",
            model: "Mustang",
            year: "1964",
            color: "red"
        }
    );
    //đặt hàm set state
    const updateColor = () => {
        setCar (previousState =>
            {
                return {...previousState, color: "blue"}
            }
        );
    }
    return (
        <>
            Show information of Car:
            <h1>My brand:{car.brand}</h1>
            <p>Color:{car.color}, model:{car.model}, year:{car.year}.</p>
            <button type="button" onClick={() => updateColor("blue")}>Update color: blue</button>
        </>
    )
}

export default Car
