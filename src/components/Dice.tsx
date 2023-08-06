import React, { useState } from "react";

interface Props {
  groupNumber: number;
  dice: number;
  setDice: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sides: number;
  setSides: (e: React.ChangeEvent<HTMLInputElement>) => void;
  remove: (e: React.MouseEvent<HTMLButtonElement>) => void;
  option: string;
  setOption: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  x: number;
  setX: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hover: boolean;
}

function Dice(props: Props) {
  const background = props.hover ? "bg-green-500" : "";
  return (
    <div className={"flex flex-row gap-2  " + background}>
      <button className="m-2" onClick={props.remove}>
        x
      </button>
      <div>{props.hover}</div>
      <input
        className={"w-10 text-right " + background}
        type="text"
        onChange={props.setDice}
        value={props.dice}
      />
      <div className="m-2">d</div>
      <input
        className={"w-10 place-content-end " + background}
        type="text"
        onChange={props.setSides}
        value={props.sides}
      />
      <select
        name="option"
        id="option"
        onChange={props.setOption}
        value={props.option}
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
        className={"w-10 place-content-end " + background}
        type="text"
        onChange={props.setX}
        value={props.x}
      />
    </div>
  );
}

export default Dice;
