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

    // case actions.quiz.QUIZ_DATA_EDITED: {
    //     return {
    //         ...state,
    //         loading: false,
    //         user: action.data,
    //     };
    // }

    // case actions.quiz.QUIZ_DATA_DELETED: {
    //     return {
    //         ...state,
    //         loading: false,
    //         user: {
    //             ...state.user,
    //             avatar: action.data.avatar,
    //         },
    //     };
    // }

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
