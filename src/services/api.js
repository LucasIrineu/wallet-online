const fetchCurrencies = async (currency) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();

  if (currency) return data[currency];

  return data;
};

export default fetchCurrencies;
