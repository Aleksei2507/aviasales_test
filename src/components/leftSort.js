import React, { Component } from 'react';
import { declOfNum } from '../helper'
import '../styles/leftSort.scss';

const Currencies = ({active, currencies, click}) => {
    
    const show = (click, active, text, num) => {
        return (
            <div key={num}
                onClick={() => click(num, text)}
                className={'left-sort__currency-item ' + active}>
                    {text}
            </div>
            ) 
    }

    return currencies.map((text, num) => {
        const activated = active === num ? '_active' : ''
        return show(click, activated, text, num)
    })
}

const RenderFlights = ({ checked, click }) => {
    const option = (item, i, text) => {
        const check = checked[i]
        return (
            <div key={i} className="flights-item _check">
                <label className="flights-item__check">
                    <input checked={check} type="checkbox" onChange={() => click('one', i)}/>
                    <div className="flights-item__check-pseudo"></div>
                    <span>{text}</span>
                </label>
                <div onClick={() => click('only', i)} className="flights-item__only">Только</div>
            </div>
        )
    }
    
    return checked.map((item, i) => {
        const text = i === 0 ? 'Без пересадок' : `${i} ${declOfNum(i, ['пересадка', 'пересадки', 'пересадок'])}`
        return option(item, i, text)
    })
}

const LeftSort = (props) =>  {
    const checked = props.stateStops.reduce((prev, next) => prev && next)

    return (
        <div className="left-sort">
            <div className="left-sort__currency">
                <div className="left-sort__title">Валюта</div>
                <div className="left-sort__currency-list">
                    <Currencies click={props.changeCurrency} active={ props.activeCurrency } currencies={ props.currencies } />
                </div>
            </div>
            <div className="left-sort__flights">
                <div className="flights">
                    <div className="left-sort__title">Количество пересадок</div>
                    <div className="flights-wrap">
                        <div className="flights-item _check">
                            <label className="flights-item__check">
                                <input checked={checked} type="checkbox" onChange={() => props.changeStops('all', -1, !checked)}/>
                                <div className="flights-item__check-pseudo"></div>
                                <span>Все</span>
                            </label>
                        </div>
                        <RenderFlights checked={ props.stateStops } click={ props.changeStops }/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftSort