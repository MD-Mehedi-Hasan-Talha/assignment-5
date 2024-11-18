import QuizEntryLeftColumn from "./LeftColumn/QuizEntryLeftColumn";
import QuizEntryNav from "./LeftColumn/QuizEntryNav";
import QuizEntryRightColumn from "./RightColumn/QuizEntryRightColumn";

export default function QuizEntry() {
  return (
    <div>
      <QuizEntryNav />

      <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 lg:gap-12">
        <QuizEntryLeftColumn />

        <QuizEntryRightColumn />
      </div>
    </div>
  );
}
