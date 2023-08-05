import React, { useState } from "react";
import Dice from "./Dice";
import { buildStaticPaths } from "next/dist/build/utils";

function Roller() {
  const [groupCount, setGroupCount] = useState<number>(2);
  const [diceList, setDiceList] = useState<number[]>(Array(groupCount).fill(1));
  const [sidesList, setSidesList] = useState<number[]>(
    Array(groupCount).fill(2)
  );

  const [resultList, setResultList] = useState<number[][]>(
    Array(groupCount).fill([2, 2])
  );
  const [sum, setSum] = useState(0);

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
    const results: number[][] = [];
    let roll = 0;
    let newSum = 0;

    for (let i = 0; i < groupCount; i++) {
      results[i] = [];
      if (sidesList[i]! > 1) {
        for (let j = 0; j < diceList[i]!; j++) {
          roll = 1 + Math.floor(Math.random() * sidesList[i]!);
          results[i]!.push(roll);
          newSum += roll;
        }
      } else {
        results[i]!.push(diceList[i]!);
        newSum += diceList[i]!;
      }
    }

    setResultList(results);
    setSum(newSum);
  }

  return (
    <div className="w-1/2 border border-black">
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
      <button className="m-2" onClick={addDiceGroup}>
        {groupCount < 10 ? "+" : ""}
      </button>

      <div className="flex flex-row justify-between">
        <div className="m-2 flex flex-row justify-between">
          {resultList.map((group, groupIndex) => (
            <div className="flex flex-row justify-between" key={groupIndex}>
              {group.map((value, valueIndex) => (
                <p className="hover:bg-green-500" key={valueIndex}>
                  {groupIndex == 0 && valueIndex == 0
                    ? value.toString()
                    : "+" + value.toString()}
                </p>
              ))}
            </div>
          ))}
          <p>{"=" + sum.toString()}</p>
        </div>
        <button
          type="button"
          className="btn btn-blue m-2"
          onClick={(e) => rollDice()}
        >
          Roll
        </button>
      </div>
    </div>
  );
}

export default Roller;
