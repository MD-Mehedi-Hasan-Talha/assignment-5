import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Components/Common/Footer";
import Header from "../Components/Common/Header";
import LeftColumn from "../Components/Quiz/LeftColumn";
import RightColumn from "../Components/Quiz/RightColumn";
import useAxios from "../Hooks/useAxios";

export default function Quiz() {
  const { quizId } = useParams();
  const { api, loading: axiosLoading } = useAxios();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [questionSet, setQuestionSet] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    async function fetchQuizById() {
      setLoading(true);
      try {
        if (quizId) {
          const response = await api.get(
            `${import.meta.env.VITE_SERVER_BASE_URL}/api/quizzes/${quizId}`
          );
          if (response.status === 200) {
            setQuiz(response.data.data);
          }
        }
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (!axiosLoading) {
      fetchQuizById();
    }
  }, [quizId, api, axiosLoading]);

  const handleAddAnswer = (newAnswer) => {
    setAnswers({
      ...answers,
      [newAnswer.id]: newAnswer.answer,
    });
  };

  const handleNextQuestion = () => {
    setQuestionSet((prevQuestionSet) => prevQuestionSet + 1);
  };

  const handlePrevQuestion = () => {
    setQuestionSet((prevQuestionSet) => prevQuestionSet - 1);
  };

  const handleSubmitAnswer = async () => {
    if (confirm("Are you sure you want to submit this quiz?")) {
      try {
        const response = await api.post(
          `${
            import.meta.env.VITE_SERVER_BASE_URL
          }/api/quizzes/${quizId}/attempt`,
          { answers }
        );

        if (response.status === 200) {
          Cookies.set("lastQuizId", JSON.stringify(response.data));
          navigate("/result", { state: response.data });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-[#F5F3FF] min-h-screen">
      <div className="container mx-auto py-3">
        <Header />
        <main className="max-w-8xl mx-auto h-[calc(100vh-10rem)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
            <LeftColumn quiz={quiz} participation={questionSet + 1} />
            <RightColumn
              key={questionSet + 1}
              question={quiz?.questions[questionSet]}
              participation={questionSet + 1}
              totalQuestions={quiz?.questions.length}
              onAddAnswer={handleAddAnswer}
              answers={answers}
              onNextQuestion={handleNextQuestion}
              onPrevQuestion={handlePrevQuestion}
              onSubmitAnswer={handleSubmitAnswer}
            />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

// here is the structure of signle quiz.
/*
{
    "id": "287e6049-9e59-49ea-bb41-9a0387dce648",
    "title": "Basic Web Development",
    "description": "Test your knowledge of JavaScript basics with quizzes that cover essential concepts, syntax, and foundational programming skills",
    "thumbnail": "http://localhost:5000/images/1730962857784-6a47596773e0bfae.png",
    "status": "published",
    "stats": {
        "total_questions": 6,
        "total_marks": 30,
        "total_attempts": 0,
        "average_score": "0.00",
        "highest_score": 0
    },
    "questions": [
        {
            "id": "4fc4f709-13e9-4555-9d03-f487c8a01aa4",
            "question": "What is React?",
            "options": [
                "A JavaScript library for building user interfaces",
                "A programming language",
                "A database management system",
                "A web server"
            ],
            "marks": 5,
            "correctAnswer": "A JavaScript library for building user interfaces"
        },
        {
            "id": "15eb9586-97b3-4ca0-b48e-0702f133d6c1",
            "question": "Which hook is used for managing state in React functional components?",
            "options": [
                "useEffect",
                "useState",
                "useContext",
                "useReducer"
            ],
            "marks": 5,
            "correctAnswer": "useState"
        },
        {
            "id": "42c1ff89-afc8-47e5-92cc-277f562135e2",
            "question": "What does CSS stand for?",
            "options": [
                "Computer Style Sheets",
                "Creative Style System",
                "Cascading Style Sheets",
                "Colorful Style Sheets"
            ],
            "marks": 5,
            "correctAnswer": "Cascading Style Sheets"
        },
        {
            "id": "0841efeb-39c3-476e-99e9-342c033c56a6",
            "question": "What is Next.js?",
            "options": [
                "string",
                "boolean",
                "integer",
                "Undefined"
            ],
            "marks": 5,
            "correctAnswer": "string"
        },
        {
            "id": "1a99732e-acd6-4b6e-adf9-2c3e71841d85",
            "question": "What is the correct way to declare a JavaScript variable?",
            "options": [
                "var variableName",
                "variableName var;",
                "v variableName;",
                "declare variableName;"
            ],
            "marks": 5,
            "correctAnswer": "var variableName"
        },
        {
            "id": "1eecba79-a790-498a-8519-1292dcc4dc3d",
            "question": "Which HTML tag is used to create a hyperlink?",
            "options": [
                "<link>",
                "<a>",
                "<href>",
                "<url>"
            ],
            "marks": 5,
            "correctAnswer": "<a>"
        }
    ],
    "user_attempt": {
        "attempted": false
    }
}

*/
