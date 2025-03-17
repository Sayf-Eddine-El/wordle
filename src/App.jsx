import { useState } from "react";
import { useEffect } from "react";
import WordContainer from "./wordsContainer";
const FILE_URL = "words.txt";

function App() {
  const [word, setWord] = useState("");
  const [active, setActive] = useState(0);
  const [win, setWin] = useState(false);
  const attempts = 5;
  const character = 5;

  useEffect(() => {
    async function fetchWord() {
      const res = await fetch(FILE_URL);
      const text = await res.json();
      const randomWord = text[Math.floor(Math.random() * text.length)];
      setWord(randomWord.toUpperCase());
    }
    fetchWord();
  }, []);

  return (
    <div className="w-full flex-col gap-6 h-full flex p-10 max-sm:mt-0 mt-10 items-center">
      {win == true ? (
        <h1 className="text-2xl max-sm:text-2xl font-bold">You Won !!!!</h1>
      ) : win == "lose" ? (
        <h1 className="text-2xl max-sm:text-sm font-bold">
          You lose , The Word is {word}{" "}
        </h1>
      ) : null}
      <h1 className="text-5xl max-sm:text-3xl max-sm:mb-0 mb-5 font-bold">
        Wordle
      </h1>
      <div className="flex flex-col max-sm:gap-0 gap-4">
        {[...Array(attempts)].map((_, i) => (
          <WordContainer
            active={active}
            attempts={attempts}
            index={i}
            character={character}
            key={i}
            word={word}
            setActive={setActive}
            setWin={setWin}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
