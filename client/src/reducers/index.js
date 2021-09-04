import { combineReducers } from "redux";
import ThreadReducer from "./threadReducer";
import CommentReducer from "./commentReducer";
import UserReducer from "./userReducer";

export default combineReducers({
  threads: ThreadReducer,
  comments: CommentReducer,
  user: UserReducer,
});
