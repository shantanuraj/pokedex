export default function app(state = {}, action) {
  switch (action.type) {
    case "API_REQUEST": {
      const { key } = action.payload;
      return {
        ...state,
        [key]: { state: "loading" }
      };
    }
    case "API_REQUEST_SUCCESS": {
      const { key, data } = action.payload;
      return {
        ...state,
        [key]: { state: "loaded", data }
      };
    }
    default:
      return state;
  }
}

export const apiRequest = (key, url) => ({
  type: "API_REQUEST",
  payload: { key, url }
});

export const apiRequestSuccess = (key, data) => ({
  type: "API_REQUEST_SUCCESS",
  payload: { key, data }
});
