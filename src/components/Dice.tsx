import type { diceGroupType } from "./typeDefs";

interface Props {
  state: diceGroupType;
  remove: () => void;
  hover: boolean;
  setState: (value: diceGroupType) => void;
}

function Dice(props: Props) {
  const background = props.hover ? "bg-green-500" : "";

  function handleDiceChange(newDice: string) {
    const value = parseInt(newDice) || 0;
    const newState = { ...props.state };

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
    <div
      className={
        "flex flex-row items-center justify-between gap-2" + background
      }
    >
      <button onClick={props.remove}>x</button>
      <div className="flex  w-1/5 flex-row">
        <input
          className={"w-2/5 text-right " + background}
          type="text"
          onChange={(e) => handleDiceChange(e.target.value)}
          value={props.state.isPositive ? props.state.dice : -props.state.dice}
        />
        <div className="">d</div>
        <input
          className={"w-2/5" + background}
          type="text"
          onChange={(e) => handleSidesChange(e.target.value)}
          value={props.state.sides}
        />
      </div>
      <select
        name="option"
        id="option"
        className="w-1/2"
        onChange={(e) => handleOptionChange(e.target.value)}
        value={props.state.option}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} title={option.title}>
            {option.text}
          </option>
        ))}
      </select>
      <div className="flex  flex-row justify-between">
        <div className="whitespace-nowrap">X =</div>
        <input
          className={"w-4 " + background}
          type="text"
          onChange={(e) => handleXChange(e.target.value)}
          value={props.state.X}
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
  );
}

const options = [
  { value: "none", title: "", text: "" },
  { value: "keepTopX", title: "Keep X highest dice rolled", text: "X Highest" },
  {
    value: "keepBottomX",
    title: "Keep X lowest dice rolled",
    text: "X Lowest",
  },
  {
    value: "discardTopX",
    title: "Discard X highest dice rolled",
    text: "Discard X Highest",
  },
  {
    value: "discardBottomX",
    title: "Discard X lowest dice rolled",
    text: "Discard X Lowest",
  },
  {
    value: "rerollMax",
    title: "Roll additional die when maximum value is rolled ",
    text: "Exploding",
  },
];
export default Dice;
