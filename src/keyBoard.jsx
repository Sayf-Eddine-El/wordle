import { QWERTY } from "./keybordLayout";

const KeyBoard = ({ addCharacter }) => {
  return (
    <div className="flex flex-row flex-wrap gap-2 w-[500px] justify-center items-center">
      {QWERTY.map((e, i) => (
        <button
          className="p-2 border-2 min-w-fit cursor-pointer hover:scale-105 active:scale-110 transition-all rounded-sm font-bold border-black size-10 flex items-center justify-center"
          key={i}
          onClick={() => addCharacter({ key: e })}
        >
          {e == "Shift" ? "Restart 🔄" : e}
        </button>
      ))}
    </div>
  );
};

export default KeyBoard;
