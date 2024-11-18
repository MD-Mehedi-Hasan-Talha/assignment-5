export default function QuizOption({ option, onSelect, isChecked }) {
  return (
    <label className="flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg">
      <input
        type="checkbox"
        name="answer1"
        className="form-radio text-buzzr-purple"
        checked={isChecked}
        onChange={onSelect}
      />
      <span>{option}</span>
    </label>
  );
}
