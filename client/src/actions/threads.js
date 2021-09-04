import {
  GET_THREADS,
  GET_THREAD_USER,
  GET_THREAD,
  GET_THREAD_COMMENTS,
  CREATE_COMMENT,
  UPDATE_THREAD,
  UPDATE_THREAD_LIST,
} from "../types";
import axios from "axios";

export const getThreads = () => async (dispatch) => {
  try {
    let res = await axios.get("http://localhost:3001/threads");
    dispatch({ type: GET_THREADS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const getThreadOwner = (id) => async (dispatch) => {
  try {
    let res = await axios.get(`http://localhost:3001/threads/${id}`);
    dispatch({ type: GET_THREAD_USER, payload: res.data.user });
  } catch (error) {}
};

export const getThread = (threadId) => async (dispatch) => {
  try {
    let res = await axios.get(`http://localhost:3001/threads/${threadId}`);

    dispatch({ type: GET_THREAD, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const createComment =
  (threadId, comment, ownerId) => async (dispatch) => {
    const commentToSend = {
      ownerId: ownerId,
      text: comment,
    };

    try {
      let res = await axios.post(
        `http://localhost:3001/comments/${threadId}`,
        commentToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: CREATE_COMMENT, payload: res.data.newComment });
    } catch (error) {}
  };

export const getThreadComments = (threadId) => async (dispatch) => {
  try {
    let res = await axios.get(`http://localhost:3001/comments/${threadId}`);

    dispatch({ type: GET_THREAD_COMMENTS, payload: res.data });
  } catch (error) {}
};

export const updateThread = (threadId, threadBody) => async (dispatch) => {
  let upvotes = {
    upvotes: threadBody,
  };

  try {
    let res = await axios.put(
      `http://localhost:3001/threads/${threadId}`,
      upvotes,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: UPDATE_THREAD, payload: res.data });
  } catch (error) {}
};

export const updateThreadList = (threadId, threadBody) => async (dispatch) => {
  let upvotes = {
    upvotes: threadBody,
  };

  try {
    let res = await axios.put(
      `http://localhost:3001/threads/${threadId}`,
      upvotes,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: UPDATE_THREAD_LIST, payload: res.data });
  } catch (error) {}
};
