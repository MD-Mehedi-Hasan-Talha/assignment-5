import QuizEntryForm from "./QuizEntryForm";

export default function QuizEntryLeftColumn() {
  return (
    <div className="">
      <h2 className="text-3xl font-bold mb-4">Binary Tree Quiz</h2>
      <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-4">
        Total number of questions : 1
      </div>
      <p className="text-gray-600 mb-4">
        Test understanding of binary tree traversal methods, tree properties,
        and algorithms.
      </p>

      <QuizEntryForm />
    </div>
  );
}
