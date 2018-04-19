import React from 'react';
import TK from "../images/logo.png"
import * as moment from 'moment';
import { declOfNum } from '../helper'
import 'moment/locale/ru';
import '../styles/list.scss';

const LeftSide = ({ ticket, price, cur }) => {
    return (
        <div className="ticket-item__left">
            <div className="ticket-item__left-logo">
                <img alt={ticket.carrier} src={TK} />
            </div>
            <div className="ticket-item__left-btn ">
                Купить<br/> за <span className={cur}>{price}</span>
            </div>
        </div>
    )
}

const RenderTikcet = ({ ticket, price, cur}, i) => {

    const getCurrentDate = date => moment(ticket.arrival_date, "MM-DD-YYYY").format("D MMM YYYY, ddd")

    return (
        <div className="ticket-item">
            <LeftSide cur={cur} ticket={ ticket } price={ price }  />
            <div className="ticket-item__right">
                <div className="ticket-item__right-top">
                    <div className="ticket-item__right-time">{ ticket.departure_time }</div>
                    <div className="ticket-item__right-stops">
                        { ticket.stops > 0 ? ticket.stops : '' }
                        <div className="ticket-item__right-line">
                            {declOfNum(ticket.stops, ['пересадка', 'пересадки', 'пересадок'])}
                        </div>
                    </div>
                    <div className="ticket-item__right-time">{ ticket.arrival_time }</div>
                </div>
                <div className="ticket-item__right-bottom">
                    <div className="ticket-item__right-bottom--left">
                        <div className="ticket-item__right-city">
                            { ticket.origin }
                            {', '}
                            { ticket.origin_name }
                        </div>
                        <div className="ticket-item__right-date">
                            { getCurrentDate( ticket.arrival_date ) }  
                        </div>
                    </div>
                    <div className="ticket-item__right-bottom--right">
                        <div className="ticket-item__right-city">
                            { ticket.destination_name }
                            {', '}
                            { ticket.destination }
                        </div>
                        <div className="ticket-item__right-date">
                            { getCurrentDate(ticket.departure_date) }  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const List = props => {
    const ticket = props.tickets.map((item, k) => {
        const cur = props.currencies[props.activeCurrency]
        const price = props.prices[k]
        return <RenderTikcet key={k} cur={cur} price={price} ticket={item} />
    })

    return (
        <div className="tickets">
            { ticket }
        </div>
    )
}

export default List