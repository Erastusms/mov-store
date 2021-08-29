import {
  GET_USERS_LIST,
  GET_USERS_DETAIL,
  POST_USER_CREATE,
  POST_MOVIES_CREATE,
  PUT_USER_EDIT,
} from "actions";

let initialState = {
  postLogin: false,
  errorLogin: false,
  getUsersList: false,
  errorUsersList: false,
  getUsersDetail: false,
  errorUsersDetail: false,
  getResponseDataUser: false,
  errorUsersDataUser: false,
  getResponseDataMovies: false,
  errorDataMovies: false,
  title: "Book Store",
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_LIST:
      return {
        ...state,
        getUsersList: action.payload.data,
        errorUsersList: action.payload.errorMessage,
      };
    case GET_USERS_DETAIL:
      return {
        ...state,
        getUsersDetail: action.payload.data,
        errorUsersDetail: action.payload.errorMessage,
      };
    case POST_MOVIES_CREATE:
      return {
        ...state,
        getResponseDataMovies: action.payload.data,
        errorDataMovies: action.payload.errorMessage,
      };
    case POST_USER_CREATE:
      return {
        ...state,
        getResponseDataUser: action.payload.data,
        errorUsersDataUser: action.payload.errorMessage,
      };
    case PUT_USER_EDIT:
      return {
        ...state,
        getResponseDataUser: action.payload.data,
        errorUsersDataUser: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default users;
