import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Display = props => <div>{props.value}</div>;

const Button = props => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
  const [value, setValue] = useState(10);

  const setToValue = newValue => {
    setValue(newValue);
  };

  return (
    <div>
      <Display value={value} />
      <Button handleClick={() => setToValue(1000)} text="thousand" />
      <Button handleClick={() => setToValue(0)} text="reset" />
      <Button handleClick={() => setToValue(value + 1)} text="increment" />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
