import React, { useState } from "react";
import Dice from "./Dice";
import type { diceGroupType, rollerType } from "./typeDefs";
import { buildStaticPaths } from "next/dist/build/utils";

interface Props {
  roller: rollerType;
  handleRollerChange: (value: rollerType) => void;
}

function Roller(props: Props) {
  //const [label, setlabel] = useState<string>("Title");
  //const [groupCount, setGroupCount] = useState<number>(2);

  //   const [groupList, setGroupList] = useState<diceGroupType[]>(
  //     Array(groupCount).fill(dummyFunction())
  //   );

  const label = props.roller.label;
  const groupList = props.roller.diceGroup;
  const groupCount = groupList.length;

  const [hover, setHover] = useState<number>(-1);

  const [resultList, setResultList] = useState<string[]>(
    Array(groupCount).fill("+2")
  );
  const [sum, setSum] = useState(4);

  function dummyFunction(): diceGroupType {
    return {
      dice: 1,
      sides: 2,
      option: "none",
      X: 1,
      isPositive: true,
    };
  }

  function handleGroupChange(index: number) {
    return (value: diceGroupType) => {
      const newRoller = { ...props.roller };
      newRoller.diceGroup[index] = { ...value };
      props.handleRollerChange(newRoller);
    };
  }

  function addDiceGroup() {
    const newRoller = { ...props.roller };
    newRoller.diceGroup.push(dummyFunction());
    props.handleRollerChange(newRoller);
  }

  function removeDiceGroup(index: number) {
    const newRoller = { ...props.roller };
    newRoller.diceGroup.splice(index, 1);
    props.handleRollerChange(newRoller);
  }

  function rollDice() {
    const results: string[] = [];
    let groupResult: number[];

    let sides = 0;
    let rollsRemaining = 0;

    let roll = 0;
    let sum = 0;

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
    <div>
      {groupList.map((value, index) => (
        <Dice
          key={index}
          state={value}
          remove={(e: React.MouseEvent<HTMLButtonElement>) =>
            removeDiceGroup(index)
          }
          hover={index == hover}
          setState={handleGroupChange(index)}
        ></Dice>
      ))}
      {groupCount < 10 && (
        <button className="m-2" onClick={addDiceGroup}>
          +
        </button>
      )}

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
