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
    <div className={"flex flex-row items-center gap-2 " + background}>
      <button className="m-2" onClick={props.remove}>
        x
      </button>
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
        onChange={(e) => handleOptionChange(e.target.value)}
        value={props.state.option}
      >
        <option value="none"></option>
        <option value="keepTopX">Keep Highest X Values</option>
        <option value="keepBottomX">Keep Lowest X Values</option>
        <option value="discardTopX">Discard Highest X Values</option>
        <option value="discardBottomX">Discard Lowest X Values</option>
        <option value="rerollMax">Reroll Maximum Valued Dice</option>
      </select>
      <div className="m-2">X =</div>
      <input
        className={"w-10 " + background}
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

export default Dice;
