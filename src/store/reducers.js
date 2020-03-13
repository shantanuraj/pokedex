export default function app(state = {}, action) {
  switch (action.type) {
    case "API_REQUEST": {
      const { key } = action.payload;
      return {
        ...state,
        [key]: { state: "loading", data: {} }
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
