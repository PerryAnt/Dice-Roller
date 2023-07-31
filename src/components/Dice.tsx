import React, { useState } from "react";

interface Props {
  dice: number;
  setDice: (value: number, index: number) => void;
  sides: number;
  setSides: (value: number, index: number) => void;
  groupNumber: number;
}

function Dice(props: Props) {
  return (
    <>
      <div className="flex flex-row gap-2">
        <input
          className="w-10 text-right"
          type="text"
          onChange={(e) => {
            if (e.target.value)
              props.setDice(parseInt(e.target.value), props.groupNumber);
          }}
          value={props.dice}
        />
        <div>d</div>
        <input
          className="w-10 place-content-end"
          type="text"
          onChange={(e) => {
            if (e.target.value)
              props.setSides(parseInt(e.target.value), props.groupNumber);
          }}
          value={props.sides}
        />
      </div>
    </>
  );
}

export default Dice;
