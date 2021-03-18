/**
 * withStore
 * @param {...string} names - 'modelA', 'modelB', ...
 * @return {array} [mapState, mapMethods]
 */
const withStore = (...names) => [
  (state) => {
    let mergedState = { now: {} };
    for (let i = 0; i < names.length; i += 1) {
      const modelState = state[names[i]];
      mergedState = {
        ...mergedState,
        ...modelState,
        ...{ now: { ...mergedState.now, ...modelState.now } },
      };
    }
    return mergedState;
  },
  (dispatch) => {
    let mergedMethods = {};
    for (let i = 0; i < names.length; i += 1) {
      const modelMethods = dispatch[names[i]];
      mergedMethods = { ...mergedMethods, ...modelMethods };
    }
    return mergedMethods;
  },
];

export default withStore;
