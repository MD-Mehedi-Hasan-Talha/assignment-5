import { actions } from "../Actions/Index";

export const initialState = {
  quizzes: [],
  questions: [],
  isLoading: false,
  error: null,
};

export const adminQuizReducer = (state, action) => {
  switch (action.type) {
    case actions.quiz.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }

    case actions.quiz.DATA_FETCHED: {
      return {
        ...state,
        loading: false,
        quizzes: action.data,
      };
    }

    case actions.quiz.DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    case actions.quiz.QUIZ_DATA_ADDED: {
      return {
        ...state,
        loading: false,
        quizzes: [...state.quizzes, action.data],
      };
    }

    case actions.quiz.QUIZ_DATA_EDITED: {
      const updatedQuiz = state.quizzes.map((quiz) =>
        quiz.id === action.data.id ? action.data : quiz
      );

      return {
        ...state,
        loading: false,
        quizzes: updatedQuiz,
      };
    }

    case actions.quiz.QUIZ_DATA_DELETED: {
      return {
        ...state,
        loading: false,
        quizzes: state.quizzes.filter((item) => item.id !== action.data.id),
      };
    }

    case actions.question.QUESTION_FETCHED: {
      return {
        ...state,
        questions: action.data,
      };
    }

    case actions.question.QUESTION_ADDED: {
      return {
        ...state,
        questions: [...state.questions, action.data],
      };
    }

    case actions.question.QUESTION_EDITED: {
      const updatedQuestions = state.questions.map((question) =>
        question.id === action.data.id ? action.data : question
      );

      return {
        ...state,
        questions: updatedQuestions,
      };
    }

    case actions.question.QUESTION_DELETED: {
      return {
        ...state,
        loading: false,
        questions: state.questions.filter(
          (item) => item.id !== action.data.questionId
        ),
      };
    }

    default: {
      return state;
    }
  }
};
