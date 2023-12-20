import React, { useState } from "react";
import Dice from "./Dice";
import type { Dicegroup } from "./typeDefs";
import { buildStaticPaths } from "next/dist/build/utils";

function Roller() {
  const [groupCount, setGroupCount] = useState<number>(2);

  const [groupList, setGroupList] = useState<Dicegroup[]>(
    Array(groupCount).fill(dummyFunction())
  );

  const [hover, setHover] = useState<number>(-1);

  const [resultList, setResultList] = useState<number[][]>(
    Array(groupCount).fill([2, 2])
  );
  const [sum, setSum] = useState(0);

  function dummyFunction(): Dicegroup {
    return {
      dice: 1,
      sides: 2,
      option: "none",
      X: 0,
      isPositive: true,
    };
  }

  function handleStateChange(index: number) {
    return (value: Dicegroup) => {
      console.log(value);
      console.log(index);
      const newGroupList = [...groupList];
      newGroupList[index] = { ...value };
      setGroupList(newGroupList);
    };
  }

  function addDiceGroup() {
    setGroupCount((value) => value + 1);

    const newGroupList = [...groupList];
    newGroupList.push(dummyFunction());
    setGroupList(newGroupList);
  }

  function removeDiceGroup(index: number) {
    setGroupCount((value) => value - 1);

    const newGroupList = [...groupList];
    newGroupList.splice(index, 1);
    setGroupList(newGroupList);
  }

  function rollDice() {
    const results: number[][] = [];
    let groupResult: number[];

    let sides = 0;
    let rollsRemaining = 0;

    let roll = 0;
    let sum = 0;
    let groupState: Dicegroup;

    for (const x of groupList) {
    }

    for (const x of groupList) {
      sides = x.sides;
      groupResult = [];
      rollsRemaining = x.dice;
      if (sides > 1) {
        for (rollsRemaining = x.dice; rollsRemaining > 0; rollsRemaining--) {
          roll = 1 + Math.floor(Math.random() * sides);
          groupResult.push(roll);
          if (roll == sides && x.option == "rerollMax") rollsRemaining++;
        }
      } else {
        groupResult = [x.dice];
      }

      //console.log(groupResult);
      groupResult.sort(compareNumbers);
      groupResult = applyOption(groupResult, x.option, x.X);

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

  function Test() {
    for (const x of groupList) {
      //console.log(x());
    }
  }

  return (
    <div className="w-1/2 border border-black">
      {groupList.map((value, index) => (
        <Dice
          key={index}
          state={value}
          remove={(e: React.MouseEvent<HTMLButtonElement>) =>
            removeDiceGroup(index)
          }
          hover={index == hover}
          setState={handleStateChange(index)}
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
        <button
          type="button"
          className="btn btn-blue m-2"
          onClick={(e) => Test()}
        >
          Test
        </button>
      </div>
    </div>
  );
}

function compareNumbers(a: number, b: number) {
  return a - b;
}

export default Roller;
