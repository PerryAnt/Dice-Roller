import React, { useState } from "react";

interface Props {
  dice: number;
  setDice: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sides: number;
  setSides: (e: React.ChangeEvent<HTMLInputElement>) => void;
  groupNumber: number;
  remove: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
    </div>
  );
}

export default Dice;
