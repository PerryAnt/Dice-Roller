import React, { useState } from "react";
import Dice from "./Dice";
import type { Dicegroup } from "./typeDefs";
import { buildStaticPaths } from "next/dist/build/utils";

function Roller() {
  const [label, setlabel] = useState<string>("Title");
  const [groupCount, setGroupCount] = useState<number>(2);

  const [groupList, setGroupList] = useState<Dicegroup[]>(
    Array(groupCount).fill(dummyFunction())
  );

  const [hover, setHover] = useState<number>(-1);

  const [resultList, setResultList] = useState<string[]>(
    Array(groupCount).fill("+2")
  );
  const [sum, setSum] = useState(4);

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
    const results: string[] = [];
    let groupResult: number[];

    let sides = 0;
    let rollsRemaining = 0;

    let roll = 0;
    let sum = 0;
    let groupState: Dicegroup;

    for (const x of groupList) {
      sides = x.sides;
      groupResult = [];
      rollsRemaining = x.dice;
      if (sides > 1) {
        for (rollsRemaining = x.dice; rollsRemaining > 0; rollsRemaining--) {
          roll = 1 + Math.floor(Math.random() * sides);
          if (roll == sides && x.option == "rerollMax") rollsRemaining++;
          groupResult.push(roll);
        }
      } else {
        groupResult = [x.dice];
      }

      groupResult.sort(compareNumbers);
      groupResult = applyOption(groupResult, x.option, x.X);

      if (!x.isPositive) {
        groupResult = groupResult.map((value) => -value);
      }

      sum += groupResult.reduce((a, b) => a + b, 0);
      results.push(
        groupResult
          .map((value) => (x.isPositive ? "+" : "") + value.toString())
          .join("")
      );
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
            <p
              //onMouseEnter={() => setHover(groupIndex)}
              //onMouseLeave={() => setHover(-1)}
              className="flex flex-row justify-between" // hover:bg-green-200"
              key={groupIndex}
            >
              {groupIndex == 0 ? group.replace(/^\+/, "") : group}
            </p>
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
