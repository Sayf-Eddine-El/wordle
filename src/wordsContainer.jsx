import { useEffect } from "react";
import KeyBoard from "./keyBoard";
import { useState } from "react";

const charArray = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const WordContainer = ({
  character,
  active,
  index,
  word,
  setActive,
  setWin,
  attempts,
}) => {
  const [attempt, setAttempt] = useState([]);
  useEffect(() => {
    if (active == index) {
      window.addEventListener("keydown", handleAddCharacter);
    }
    return () => {
      window.removeEventListener("keydown", handleAddCharacter);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt, active]);

  const handleAddCharacter = (e) => {
    if (charArray.includes(String(e.key).toUpperCase())) {
      setAttempt((prev) => {
        if (prev.length < 5) {
          return [...prev, { value: e.key.toUpperCase(), color: "white" }];
        }
        return prev;
      });
    }
    if (e.key == "Backspace") {
      setAttempt((prev) => prev.filter((_, i) => i != prev.length - 1));
    }

    if (e.key == "Enter") {
      handleValidAnswer();
    }
    if (e.key == "Shift") {
      window.location.reload();
    }
  };

  const handleValidAnswer = () => {
    const wordArray = [...word];
    if (attempt.length == 5) {
      for (let i = 0; i < attempt.length; i++) {
        let initialData = attempt[i];
        if (wordArray.includes(attempt[i].value)) {
          initialData.color = "orange";
          if (wordArray[i] == attempt[i].value) {
            initialData.color = "green";
          }
        } else {
          initialData.color = "gray";
        }
        setAttempt((prev) =>
          prev.map((e, index) => (i == index ? initialData : e))
        );
      }
      let isWin = 0;

      attempt.map((e) => {
        if (e.color == "green") {
          isWin += 1;
        }
      });
      if (isWin == character) {
        setWin(true);
      } else {
        setActive((prev) => {
          if (prev < attempts - 1) {
            return prev + 1;
          } else {
            setWin("lose");
          }
        });
      }
    }
  };
  return (
    <div className="flex flex-row justify-center h-full items-center max-sm:gap-0 gap-2">
      {[...Array(character)].map((e, i) => (
        <h1
          key={i}
          className="border-2 text-center text-2xl max-sm:scale-[0.6] flex justify-center font-bold items-center border-black size-16"
          style={{ backgroundColor: attempt[i]?.color }}
        >
          {attempt[i]?.value || ""}
        </h1>
      ))}
      {active == index ? (
        <div className="fixed bottom-0 max-sm:-bottom-6 max-sm:scale-[0.75] flex flex-col gap-6  justify-center items-center p-10">
          <h1 className="font-bold text-3xl">KeyBoard</h1>
          <KeyBoard addCharacter={handleAddCharacter} />
        </div>
      ) : null}
    </div>
  );
};

export default WordContainer;
