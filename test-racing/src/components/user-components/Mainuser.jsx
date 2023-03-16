import axios from 'axios'
import React, { useContext } from 'react'
import { useLoaderData } from 'react-router-dom'
import { racingContext } from '../../context/Context';

function Mainuser() {

    const { sessions, vehicles, setups } = useContext(racingContext);
    const data = useLoaderData();
    
    
  return (
    <div>{JSON.stringify(data)}</div>
    )
}

export default Mainuser