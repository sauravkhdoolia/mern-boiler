import { LOGIN_USER } from "../actions/types";
import { REGISTER_USER } from "../actions/types";

export default function (state = {}, action) {
  switch (action.types) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case REGISTER_USER:
      console.log("This:", state, action.payload);
      return { ...state, success: action.payload };
    default:
      return state;
  }
}
