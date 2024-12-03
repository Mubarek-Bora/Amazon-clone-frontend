import React from "react";
import numeral from "numeral";

const CurrencyFormat = ({ amount }) => {
  const currencyFormatted = numeral(amount).format("$0,0.00");
  return <div>{currencyFormatted}</div>;
};

export default CurrencyFormat;
