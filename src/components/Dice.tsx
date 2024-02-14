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
    <div className={"padding-2 flex flex-row items-center gap-2" + background}>
      <button onClick={props.remove}>x</button>
      <div>{props.hover}</div>
      <input
        className={"w-10 text-right " + background}
        type="text"
        onChange={(e) => handleDiceChange(e.target.value)}
        value={props.state.isPositive ? props.state.dice : -props.state.dice}
      />
      <div className="m-2">d</div>
      <input
        className={"w-10" + background}
        type="text"
        onChange={(e) => handleSidesChange(e.target.value)}
        value={props.state.sides}
      />
      <select
        name="option"
        id="option"
        className="w-40"
        onChange={(e) => handleOptionChange(e.target.value)}
        value={props.state.option}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} title={option.title}>
            {option.text}
          </option>
        ))}
      </select>
      <div className="m-2">X =</div>
      <input
        className={"w-4 " + background}
        type="text"
        onChange={(e) => handleXChange(e.target.value)}
        value={props.state.X}
      />
      <label className="m-2">
        <input
          className="m-2"
          type="checkbox"
          checked={props.state.doubleOnCrit}
          onChange={handleCritChange}
        />
        Double on Crit
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
