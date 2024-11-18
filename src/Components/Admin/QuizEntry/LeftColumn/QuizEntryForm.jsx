import AnswerOption from "./AnswerOption";

export default function QuizEntryForm() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">Create Quiz</h2>

      <div>
        <label
          htmlFor="quizTitle"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Question Title
        </label>
        <input
          type="text"
          id="quizTitle"
          name="quizTitle"
          className="w-full mt-2 p-2 border border-input rounded-md bg-background text-foreground"
          placeholder="Enter quiz title"
        />
      </div>

      <p className="text-sm text-gray-600 mt-4">Add Options</p>

      <div id="optionsContainer" className="space-y-2 mt-4">
        <AnswerOption label="Option 1" answer="" isCorrect={false} />
        <AnswerOption label="Option 2" answer="" isCorrect={true} />
        <AnswerOption label="Option 3" answer="" isCorrect={false} />
        <AnswerOption label="Option 4" answer="" isCorrect={false} />
      </div>
      <button className="w-full bg-primary text-white text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors">
        Save Quiz
      </button>
    </div>
  );
}
