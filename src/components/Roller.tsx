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
    const newDiceList = [...diceList];
    newDiceList[index] = value;
    setDiceList(newDiceList);
  }

  function updateSidesList(value: number, index: number) {
    const newSidesList = [...sidesList];
    newSidesList[index] = value;
    setSidesList(newSidesList);
  }

  function addDiceGroup() {
    setGroupCount((value) => value + 1);

    const newDiceList = [...diceList];
    newDiceList.push(1);
    setDiceList(newDiceList);

    const newSidesList = [...sidesList];
    newSidesList.push(groupCount + 1);
    setSidesList(newSidesList);
  }

  function removeDiceGroup(index: number) {
    setGroupCount((value) => value - 1);

    const newDiceList = [...diceList];
    newDiceList.splice(index, 1);
    setDiceList(newDiceList);

    const newSidesList = [...sidesList];
    newSidesList.splice(index, 1);
    setSidesList(newSidesList);
  }

  function rollDice() {
    const results = [];
    let roll = 0;
    let sum = 0;

    for (let i = 0; i < groupCount; i++) {
      for (let j = 0; j < diceList[i]!; j++) {
        roll = 1 + Math.floor(Math.random() * sidesList[i]!);
        results.push(roll);
        sum += roll;
      }
    }

    return setResultText(results.join("+") + " = " + sum.toString());
  }

  return (
    <>
      {diceList.map((value, index) => (
        <Dice
          key={index}
          dice={diceList[index] || 0}
          setDice={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value) updateDiceList(parseInt(e.target.value), index);
          }}
          sides={sidesList[index] || 0}
          setSides={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value)
              updateSidesList(parseInt(e.target.value), index);
          }}
          groupNumber={index}
          remove={(e: React.MouseEvent<HTMLButtonElement>) =>
            removeDiceGroup(index)
          }
        ></Dice>
      ))}
      <button onClick={addDiceGroup}>{groupCount < 10 ? "+" : ""}</button>

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
