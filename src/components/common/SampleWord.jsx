function SampleWord({ word, state }) {
  return (
    <div className={`sample-word sample-word__${state}`}>
      {word.split("").map((letter, index) => (
        <span
          key={index}
          className={
            state === "correct" && index === 0
              ? "correct"
              : state === "present" && index === 2
              ? "present"
              : state === "absent" && index === 3
              ? "absent"
              : null
          }
        >
          {letter}
        </span>
      ))}
    </div>
  );
}

export default SampleWord;
