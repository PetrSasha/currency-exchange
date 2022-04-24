import {useEffect, useState} from 'react'
import CurrencyInput from './components/CurrencyInput'
import './styles/index.css'
import axios from 'axios'

function App() {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(29.3818);
  const [currency1, setCurrency1] = useState('USD');
  const [currency2, setCurrency2] = useState('UAH');
  const [rates, setRates] = useState([]);

  useEffect(() =>{
    axios.get('http://data.fixer.io/api/latest?access_key=8e53a624e37f7d6a62e0eda88165d331')
    .then(response =>{
      setRates(response.data.rates)
    })
  },[])

  const format = (number) => {
    return format.toFixed(4)
  }

  const handleAmount1Change = (amount1) => {
    setAmount2(amount1 * rates[currency2] / rates[currency1])
    setAmount1(amount1)
  }


  const handleCurrency1Change = (currency1) => {
    setAmount2(amount1 * rates[currency2] / rates[currency1])
    setCurrency1(currency1)
  }

  const handleAmount2Change = (amount2) => {
    setAmount1(amount2 * rates[currency1] / rates[currency2])
    setAmount2(amount2)
  }

  const handleCurrency2Change = (currency2) => {
    setAmount1(amount2 * rates[currency1] / rates[currency2])
    setCurrency2(currency2)
  }


  return (
    <div className="App">
      <h1>Currency Convertor</h1>
     <CurrencyInput
      onAmountChange={handleAmount1Change}
      onCurrencyChange={handleCurrency1Change}
      currencies={Object.keys(rates)} 
      currency={currency1}
      amount={amount1}
      />
     <CurrencyInput 
      onAmountChange={handleAmount2Change}
      onCurrencyChange={handleCurrency2Change}
      currencies={Object.keys(rates)}
      currency={currency2}
      amount={amount2} 
      />
    </div>
  )
}
  

export default App
