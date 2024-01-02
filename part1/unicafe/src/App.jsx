import { useState } from "react";

const Button = (props) => {
  const { handleClick, text } = props;
  return <button onClick={handleClick}>{text}</button>;
};
const Statistics = (props) => {
  const { good, neutral, bad } = props;
  const average = (good - bad) / (good + neutral + bad);
  const precentageGood = (good / (good + neutral + bad)) * 100;
  const totalFeedbackAmount = good + neutral + bad;
  if (totalFeedbackAmount === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <div>
      <h2>Statistics:</h2>
      <table>
        <thead>
          <tr>
            <th>
              <h3> Rating type</h3>
            </th>
            <th>
              <h3> Ratings</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          <StatisticLine text="Good:" value={good}></StatisticLine>
          <StatisticLine text="Neutral:" value={neutral}></StatisticLine>
          <StatisticLine text="Bad:" value={bad}></StatisticLine>
          <StatisticLine
            text="Total feedback given:"
            value={totalFeedbackAmount}
          ></StatisticLine>
        </tbody>
        <tfoot>
          <StatisticLine text="Average:" value={average}></StatisticLine>
          <StatisticLine
            text="Precentage of positive:"
            value={precentageGood + " %"}
          ></StatisticLine>
        </tfoot>
      </table>
    </div>
  );
};

const StatisticLine = (props) => {
  const { text, value } = props;
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
