import type { diceGroupType } from "./typeDefs";
import { useState } from "react";

interface Props {
  state: diceGroupType;
  remove: () => void;
  hover: boolean;
  setState: (value: diceGroupType) => void;
}

type visibility = "visible" | "invisible";

function Dice(props: Props) {
  const background = props.hover ? "bg-green-500" : "";

  const [nVisibility, setNVisibility] = useState<visibility>("invisible");

  function handleDiceChange(newDice: string) {
    const value = parseInt(newDice) || 0;
    const newState = { ...props.state };

    if (newDice.charAt(0) == "0") {
      newState.dice = value;
      newState.isPositive = false;
      props.setState(newState);
      return;
    }

    if (value >= 0) {
      newState.dice = value;
      newState.isPositive = true;
    } else {
      newState.dice = -value;
      newState.isPositive = false;
    }

    props.setState(newState);
  }

  function handleSidesChange(newSides: string) {
    const value = parseInt(newSides);
    const newState = { ...props.state };

    if (value >= 0) newState.sides = value;
    props.setState(newState);
  }

  function handleOptionChange(newOption: string) {
    const newState = { ...props.state };
    newState.option = newOption;
    props.setState(newState);
  }

  function handleXChange(newX: string) {
    const value = parseInt(newX);
    const newState = { ...props.state };

    if (value >= 0) newState.X = value;
    props.setState(newState);
  }

  function handleCritChange() {
    const newState = { ...props.state };
    newState.doubleOnCrit = !props.state.doubleOnCrit;
    props.setState(newState);
  }

  return (
    <div>
      <button onClick={props.remove}>x</button>
      <div className={"flex flex-row" + background}>
        <div className="flex flex-row">
          <input
            className={"w-2/5 text-right " + background}
            type="number"
            onChange={(e) => handleDiceChange(e.target.value)}
            onFocus={(e) => e.target.select()}
            value={
              props.state.isPositive ? props.state.dice : -props.state.dice
            }
          />
          <div className="">d</div>
          <input
            className={"w-2/5" + background}
            type="number"
            onChange={(e) => handleSidesChange(e.target.value)}
            onFocus={(e) => e.target.select()}
            value={props.state.sides}
          />
        </div>
        <label className="flex flex-row gap-2 whitespace-nowrap">
          <input
            type="checkbox"
            checked={props.state.doubleOnCrit}
            onChange={handleCritChange}
          />
          <div>Double on Crit</div>
        </label>
      </div>
      <div className={"flex flex-row items-center justify-around" + background}>
        <select
          name="option"
          id="option"
          onChange={(e) => handleOptionChange(e.target.value)}
          value={props.state.option}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              title={option.title}
            >
              {option.text}
            </option>
          ))}
        </select>
        <div className="flex flex-row">
          <div className="whitespace-nowrap">N =</div>
          <input
            className={"w-4" + background}
            type="number"
            onChange={(e) => handleXChange(e.target.value)}
            onFocus={(e) => e.target.select()}
            value={props.state.X}
          />
        </div>
      </div>
      <br />
    </div>
  );
}

const options = [
  {
    value: "none",
    title: "",
    text: "",
  },
  {
    value: "keepTopN",
    title: "Keep N highest dice rolled",
    text: "N Highest",
  },
  {
    value: "keepBottomN",
    title: "Keep N lowest dice rolled",
    text: "N Lowest",
  },
  {
    value: "discardTopN",
    title: "Discard N highest dice rolled",
    text: "Discard N Highest",
  },
  {
    value: "discardBottomN",
    title: "Discard N lowest dice rolled",
    text: "Discard N Lowest",
  },
  {
    value: "rerollMax",
    title: "Roll additional die when maximum value is rolled ",
    text: "Exploding",
  },
];
export default Dice;
