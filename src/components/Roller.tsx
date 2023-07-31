import React, { useState } from "react";
import Dice from "./Dice";

function Roller() {
  const [groupCount, setGroupCount] = useState<number>(2);
  const [diceList, setDiceList] = useState<number[]>(Array(groupCount).fill(1));
  const [sidesList, setSidesList] = useState<number[]>(
    Array(groupCount).fill(2)
  );

  const [resultText, setResultText] = useState("");

  function updateDiceList(value: number, index: number) {
    let newDiceList = [...diceList];
    newDiceList[index] = value;
    setDiceList(newDiceList);
  }

  function updateSidesList(value: number, index: number) {
    let newSidesList = [...sidesList];
    newSidesList[index] = value;
    setSidesList(newSidesList);
  }

  function rollDice() {
    let results = [];
    let roll = 0;
    let sum = 0;

    for (let i = 0; i < groupCount; i++) {
      for (let j = 0; j < diceList[i]!; j++) {
        roll = 1 + Math.floor(Math.random() * sidesList[i]!);
        results.push(roll);
        sum += roll;
      }
    }

    return setResultText(results.join("+") + " = " + sum);
  }

  return (
    <>
      {diceList.map((value, index) => (
        <Dice
          key={index}
          dice={diceList[index] || 0}
          setDice={updateDiceList}
          sides={sidesList[index] || 0}
          setSides={updateSidesList}
          groupNumber={index}
        ></Dice>
      ))}

      <button
        type="button"
        className="btn btn-blue"
        onClick={(e) => rollDice()}
      >
        Roll
      </button>
      <p>{resultText}</p>
    </>
  );
}

export default Roller;
