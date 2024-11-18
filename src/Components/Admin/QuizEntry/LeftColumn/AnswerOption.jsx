export default function AnswerOption({ label, answer, isCorrect }) {
  return (
    <div className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white">
      <input
        type="checkbox"
        id="option3"
        name="correctAnswer"
        checked={isCorrect}
        className="text-primary focus:ring-0 w-4 h-4"
      />
      <label htmlFor="option3" className="sr-only">
        {label}
      </label>
      <input
        type="text"
        id="optionText3"
        name="optionText3"
        className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
        placeholder={label}
        value={answer}
      />
    </div>
  );
}
