import React, { useEffect, useState } from "react";

function Currency() {
  let [amount, setAmount] = useState();
  let [currency, setCurrency] = useState([]);
  let [fromcur, setFromcur] = useState("");
  let [tocur, setTocur] = useState("");
  let [convertamt, setConvertamt] = useState(null);
  let [converting, setconverting] = useState(false);

  const curr = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      setCurrency(Object.keys(data));
      setFromcur("INR");
      setTocur("USD");
    } catch (error) {
      console.log("error fetching ");
    }
  };
  useEffect(() => {
    curr();
  }, []);

  const currconvert = async () => {
    if (!amount) return;
    setconverting(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${parseFloat(
          amount
        )}&from=${fromcur}&to=${tocur}`
      );
      const data = await res.json();
      setConvertamt(data.rates[tocur] + " " + tocur);
    } catch (error) {
      console.log("error fetching ");
    } finally {
      setconverting(false);
    }
  };
  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 text-2xl font-semibold text-gray-700">
        Currency Converter
      </h2>
      <div>
        <div>
          <label
            htmlFor=""
            className="block text-sm font-medium text-gray-700 "
          >
            From:
          </label>
          <select
            value={fromcur}
            onChange={(e) => setFromcur(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-indico-300"
          >
            {currency.map((currency) => (
              <option value={currency} key={currency}>
                {currency}
              </option>
            ))}
          </select>
          <label
            htmlFor=""
            className="block mt-3 text-sm font-medium text-gray-700 "
          >
            To:
          </label>
          <select
            value={tocur}
            onChange={(e) => setTocur(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-indico-300"
          >
            {currency.map((currency) => (
              <option value={currency} key={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-3">
          <label
            htmlFor=""
            className="block text-sm font-medium text-gray-700 "
          >
            Amount:
          </label>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={currconvert}
            disabled={converting}
            className="px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
          >
           {converting?"converting...":"convert"}
          </button>
        </div>

        <div className="mt-3 text-red-500 font-semibold">
          Converted amount: {convertamt ? convertamt : "No conversion yet"}
        </div>
      </div>
    </div>
  );
}

export default Currency;
