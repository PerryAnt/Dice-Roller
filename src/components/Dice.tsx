import React, { useState } from "react";

interface Props {
  dice: number;
  setDice: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sides: number;
  setSides: (e: React.ChangeEvent<HTMLInputElement>) => void;
  groupNumber: number;
  remove: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Dice(props: Props) {
  return (
    <div className="flex flex-row gap-2">
      <button className="m-2" onClick={props.remove}>
        x
      </button>
      <input
        className="w-10 text-right"
        type="text"
        onChange={props.setDice}
        value={props.dice}
      />
      <div className="m-2">d</div>
      <input
        className="w-10 place-content-end"
        type="text"
        onChange={props.setSides}
        value={props.sides}
      />
    </div>
  );
}

export default Dice;
