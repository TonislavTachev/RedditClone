import {
  GET_THREADS,
  GET_THREAD,
  GET_THREAD_COMMENTS,
  CREATE_COMMENT,
  UPDATE_THREAD,
  UPDATE_THREAD_LIST,
} from "../types";

const initialState = {
  threads: [],
  singleThread: null,
  singleThreadComments: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;

    case GET_THREADS: {
      return {
        ...state,
        threads: action.payload,
      };
    }

    case GET_THREAD: {
      return {
        ...state,
        singleThread: action.payload,
      };
    }

    case GET_THREAD_COMMENTS: {
      return {
        ...state,
        singleThreadComments: action.payload,
      };
    }
    case CREATE_COMMENT: {
      return {
        ...state,
        singleThreadComments: [...state.singleThreadComments, action.payload],
      };
    }

    case UPDATE_THREAD: {
      return {
        ...state,
        singleThread: action.payload,
      };
    }

    case UPDATE_THREAD_LIST: {
      return {
        ...state,
        threads: state.threads.map((thread) =>
          thread.thread_id === action.payload.thread_id
            ? action.payload
            : thread
        ),
      };
    }
  }
};
