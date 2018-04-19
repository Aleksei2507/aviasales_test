import React, { Component } from 'react'
import LeftSort from './components/leftSort'
import List from './components/list'
import './App.scss'

class App extends Component {
  constructor(props) {
    super(props)
    this.tickets = []
    this.numStops = 0
    this.state = {
      stateStops: Array(4).fill(true),
      sort: [],
      prices: [],
      
    }
    this.currencies = ['rub', 'usd', 'eur']
    this.activeCurrency = 0
  }

  unique(arr) {
    const stops = new Set() 
    arr
      .sort((a, b) => a.stops - b.stops)
      .forEach(element => {
        stops.add(element.stops)
      });
    return [...stops]
  }

  getAllPrices(arr) {
    console.log(this.activeCurrency)
    const text = this.currencies[this.activeCurrency]
    const divider = text === 'eur' ? 71 : text === 'usd' ? 61 : 1
    const prices = arr.map(item => +(item.price / divider).toFixed(0))
    return prices
  }
  
  componentDidMount() {
    fetch('tickets.json')
      .then(res => res.json())
      .then(({ tickets }) => {
        this.tickets = tickets.sort((a, b) => a.price - b.price)
        this.numStops = this.unique([...this.tickets]).length
        this.setState(() => ({
          stateStops: Array(this.numStops).fill(true),
          sort: this.tickets,
          prices: this.getAllPrices(this.tickets)
        }))
      })
  }

  changeStops = (type, i, checked) => {
    const length = this.numStops
    const newStops = []
    const newTicket = [],
        filtering = (item) => {
          if (newStops[item.stops]) {
            return true
          } else {
            return false
          }
        };
        switch (type) {
          case 'all':
            newStops.push(...Array(length).fill(checked))
            break
          case 'only':
            newStops.push(...Array(length).fill(false))
            newStops[i] = true
            break
          case 'one':
            newStops.push(...this.state.stateStops)
            newStops[i] = !newStops[i]
            break

          default:
          }
    newTicket.push(...this.tickets.filter((item) => filtering(item)))
    this.setState({
      stateStops: newStops,
      sort: newTicket,
      prices: this.getAllPrices(newTicket)
    })
  }

  changeCurrency = (num, text) => {
    this.activeCurrency = num
    const arrPrices = this.getAllPrices(this.state.sort)

    this.setState({prices: arrPrices})
  }

  render() {
    return (
      <div className="searct-tickets">
        <LeftSort 
          changeCurrency = { this.changeCurrency }
          activeCurrency = { this.activeCurrency }
          currencies = { this.currencies }

          stateStops = { this.state.stateStops }
          changeStops = { this.changeStops}
        />
        <List
          activeCurrency = { this.activeCurrency }
          currencies = { this.currencies }
          prices = { this.state.prices }
          tickets = { this.state.sort }
        />
      </div>
    );
  }
}

export default App;
