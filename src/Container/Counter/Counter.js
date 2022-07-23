import React from 'react';
import { decrement, increment } from '../../redux/Action/Counter.action';
import { useDispatch, useSelector } from 'react-redux';

function Counter(props) {
    const dispatch = useDispatch();
    const c = useSelector(state => state.counter);

    const handleIncrement = () => {
        dispatch(increment())
    }

    const handledecrement = () => {
        dispatch(decrement())
    }

    return (
        <div>
            <button onClick={() => handleIncrement()}> + </button>
            {c.counter}
            <button onClick={() => handledecrement()}> - </button>
        </div>
    );
}

export default Counter;