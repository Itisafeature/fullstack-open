import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = () => <h1>Give Feedback</h1>;

const StatDisplay = props => {
  if (props.text === 'positive') {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.count}%</td>
      </tr>
    );
  }
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.count}</td>
    </tr>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <Header />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <div>
        {(good > 0 || neutral > 0 || bad > 0) && (
          <>
            <h2>Statistics</h2>
            <table>
              <tbody>
                <StatDisplay text="good" count={good} />
                <StatDisplay text="neutral" count={neutral} />
                <StatDisplay text="bad" count={bad} />
                <StatDisplay text="all" count={good + neutral + bad} />
                <StatDisplay
                  text="average score"
                  count={(good - bad) / (good + bad + neutral)}
                />
                <StatDisplay
                  text="positive"
                  count={(good / (good + neutral + bad)) * 100}
                />
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
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
