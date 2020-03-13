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
    case "API_REQUEST_CANCEL": {
      const { key } = action.payload;
      const leaf = state[key];
      const loadingState = leaf.state === 'loading' ? 'initial' : leaf.state;
      return {
        ...state,
        [key]: { ...leaf, state: loadingState }
      };
    }
    default:
      return state;
  }
}
