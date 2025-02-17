import React, { useState } from "react";
import "./FlightAPI.css";

function FlightAPI() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [currency, setCurrency] = useState("");
  const [outboundDate, setOutboundDate] = useState("");
  const [inboundDate, setInboundDate] = useState("");
  const [flightPrices, setFlightPrices] = useState([]);
  const [showTable, setShowTable] = useState(false); // Add a state variable to track if the search button is clicked

  const basename = process.env.REACT_APP_URL;
  const uri = `${basename}/api/proxy?api=flight&destination=${destination}&origin=${source}&departureDate=2023-07-01&returnDate=2023-07-21&currency=INR&locale=en-GB&country=IN`
  
  const handleSearch = async () => {
    try {
      const options = { method: 'GET' };
  

      const response = await fetch(`https://skyscanner44.p.rapidapi.com/fly-to-country?destination=${destination}&origin=${source}&departureDate=2023-07-01&returnDate=2023-07-21&currency=INR&locale=en-GB&country=IN`, options);
      console.log(`https://skyscanner44.p.rapidapi.com/fly-to-country?destination=${destination}&origin=${origin}&departureDate=${outboundDate}&returnDate=${inboundDate}&currency=${currency}&locale=en-GB&country=IN`)
      const data = await response.json();
      console.log(data)
      setFlightPrices(data);
      setShowTable(true); // Set the state variable to true when the search button is clicked
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
    <h2>Let's plan a trip!</h2>
    <div className="flight-prices-container">
      
      <label> Select Airport   - 
        <select value={source} onChange={(e) => setSource(e.target.value)}>
            <option value="">Select Source</option>
            <option value="AUH">Abu Dhabi</option>
            <option value="LHR">London</option>
            <option value="JFK">New York</option>
            <option value="SYD">Sydney</option>
        </select>
      </label>
      <label>
        Destination   -
        <select value={destination} onChange={(e) => setDestination(e.target.value)}>
            <option value="">Select Destination</option>
            <option value="IN">India</option>
            <option value="US">USA</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
        </select>
      </label>
      <label>
        Currency   -
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="">Select Currency</option>
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
        </select>
      </label>
      <label>
        Outbound Date   -
        <input
            type="date"
            value={outboundDate}
            onChange={(e) => setOutboundDate(e.target.value.split('T')[0])}
        />
      </label>
      <label>
        Inbound Date   -
        <input
            type="date"
            value={inboundDate}
            onChange={(e) => setInboundDate(e.target.value.split('T')[0])}
        />
      </label>
      <button onClick={handleSearch}>Search</button>
      {showTable && ( 
      <table>
        <thead>
          <tr>
            <th>Destination</th>
            <th>Country</th>
            <th>Direct Flight Price</th>
            <th>Indirect Flight Price</th>
            <th>Hotel Price</th>
          </tr>
        </thead>
        <tbody>
  {Array.isArray(flightPrices.PlacePrices) &&
    flightPrices.PlacePrices.map((flightPrice) => (
      <tr key={flightPrice.Id}>
        <td>{flightPrice.Name}</td>
        <td>{flightPrice.CountryName}</td>
        <td>{flightPrice.DirectPrice}</td>
        <td>{flightPrice.IndirectPrice}</td>
        <td>{flightPrice.HotelPrice}</td>
      </tr>
    ))}
</tbody>
      </table>
      )}
    </div>
    </>
  );
}

export default FlightAPI;
