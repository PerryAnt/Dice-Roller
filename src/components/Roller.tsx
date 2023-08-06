import React, { useState } from "react";
import Dice from "./Dice";
import { buildStaticPaths } from "next/dist/build/utils";

function Roller() {
  const [groupCount, setGroupCount] = useState<number>(2);
  const [diceList, setDiceList] = useState<number[]>(Array(groupCount).fill(1));
  const [sidesList, setSidesList] = useState<number[]>(
    Array(groupCount).fill(2)
  );
  const [optionList, setOptionList] = useState<string[]>(
    Array(groupCount).fill("")
  );
  const [xList, setXList] = useState<number[]>(Array(groupCount).fill(0));
  const [hover, setHover] = useState<number>(-1);

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

  function updateOptionList(value: string, index: number) {
    const newOptionList = [...optionList];
    newOptionList[index] = value;
    setOptionList(newOptionList);
  }

  function updateXList(value: number, index: number) {
    const newXList = [...xList];
    newXList[index] = value;
    setXList(newXList);
  }

  function addDiceGroup() {
    setGroupCount((value) => value + 1);

    const newDiceList = [...diceList];
    newDiceList.push(1);
    setDiceList(newDiceList);

    const newSidesList = [...sidesList];
    newSidesList.push(groupCount + 1);
    setSidesList(newSidesList);

    const newOptionList = [...optionList];
    newOptionList.push("none");
    setOptionList(newOptionList);
  }

  function removeDiceGroup(index: number) {
    setGroupCount((value) => value - 1);

    const newDiceList = [...diceList];
    newDiceList.splice(index, 1);
    setDiceList(newDiceList);

    const newSidesList = [...sidesList];
    newSidesList.splice(index, 1);
    setSidesList(newSidesList);

    const newOptionList = [...optionList];
    newOptionList.splice(index, 1);
    setOptionList(newOptionList);
  }

  function rollDice() {
    const results: number[][] = [];
    let groupResult: number[];

    let sides = 0;
    let rollsRemaining = 0;

    let roll = 0;
    let sum = 0;

    for (let i = 0; i < groupCount; i++) {
      sides = sidesList[i]!;
      groupResult = [];
      rollsRemaining = diceList[i]!;
      if (sides > 1) {
        for (
          rollsRemaining = diceList[i]!;
          rollsRemaining > 0;
          rollsRemaining--
        ) {
          roll = 1 + Math.floor(Math.random() * sides);
          groupResult.push(roll);
          if (roll == sides && optionList[i]! == "rerollMax") rollsRemaining++;
        }
      } else {
        groupResult = [diceList[i]!];
      }

      //console.log(groupResult);
      groupResult.sort(compareNumbers);
      groupResult = applyOption(groupResult, optionList[i]!, xList[i]!);

      sum += groupResult.reduce((a, b) => a + b, 0);
      results.push(groupResult);
    }
    setResultList(results);
    setSum(sum);
  }

  function applyOption(rawResult: number[], option: string, x: number) {
    let result: number[] = [];

    switch (option) {
      case "none":
        result = [...rawResult];
        break;
      case "keepTopX":
        result = rawResult.slice(-x);
        break;
      case "keepBottomX":
        result = rawResult.slice(0, x);
        break;
      case "discardTopX":
        result = rawResult.slice(0, -x);
        break;
      case "discardBottomX":
        result = rawResult.slice(x);
        break;
      default:
        result = [...rawResult];
    }

    return result;
  }

  return (
    <div className="w-1/2 border border-black">
      {diceList.map((value, index) => (
        <Dice
          key={index}
          groupNumber={index}
          dice={diceList[index] || 0}
          setDice={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value) updateDiceList(parseInt(e.target.value), index);
          }}
          sides={sidesList[index] || 0}
          setSides={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value)
              updateSidesList(parseInt(e.target.value), index);
          }}
          remove={(e: React.MouseEvent<HTMLButtonElement>) =>
            removeDiceGroup(index)
          }
          option={optionList[index] || "none"}
          setOption={(e: React.ChangeEvent<HTMLSelectElement>) =>
            updateOptionList(e.target.value, index)
          }
          x={xList[index] || 0}
          setX={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value) updateXList(parseInt(e.target.value), index);
          }}
          hover={index == hover}
        ></Dice>
      ))}
      <button className="m-2" onClick={addDiceGroup}>
        {groupCount < 10 ? "+" : ""}
      </button>

      <div className="flex flex-row justify-between">
        <div className="m-2 flex flex-row justify-between">
          {resultList.map((group, groupIndex) => (
            <div
              //onMouseEnter={() => setHover(groupIndex)}
              //onMouseLeave={() => setHover(-1)}
              className="flex flex-row justify-between" // hover:bg-green-200"
              key={groupIndex}
            >
              {group.map((value, valueIndex) => (
                <p
                  className="" //"hover:bg-green-500"
                  key={valueIndex}
                >
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

function compareNumbers(a: number, b: number) {
  return a - b;
}

export default Roller;
