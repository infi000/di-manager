/* eslint-disable */
import {
  createStore as theRealCreateStore,
  compose,
  combineReducers,
  applyMiddleware,
} from 'redux';

/**
 * isAsyncFn
 * @param {function} fn
 * @returns {boolean}
 */
const isAsyncFn = (fn) => {
  if (typeof fn !== 'function') return false;
  const str = fn.toString();
  return (
    str.includes('regeneratorRuntime.mark(') ||
    str.includes('_regenerator') ||
    str.includes('.apply(')
  );
};

/**
 * createReducer
 * @param {string} name
 * @param {object} state
 * @param {object} reducers
 * @returns {Reducer}
 */
const createReducer = (name, state, reducers) => (currentState = state, action) => {
  const { type, now, payload } = action;
  const [namespace, reducerName] = type.split('/');
  if (namespace !== name) return currentState;
  if (reducerName === '$SET_LOADING') return { ...currentState, now };
  return reducers[reducerName](currentState, ...payload);
};

/**
 * createStore
 * @param {object} models
 * @param {array} middleWares
 * @returns {Store}
 */
const createStore = (models, middleWares = []) => {
  // Reducer
  const rootReducers = {};
  Object.entries(models).forEach(([name, model]) => {
    const { state, reducers } = model;
    rootReducers[name] = createReducer(name, state, reducers);
  });

  // Store
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = theRealCreateStore(
    combineReducers(rootReducers),
    composeEnhancers(applyMiddleware(...middleWares)),
  );
  const { dispatch, getState } = store;

  // Methods
  Object.entries(models).forEach(([name, model]) => {
    const { state, reducers, actions } = model;
    // reducers
    const newReducers = {};
    Object.keys(reducers).forEach((reducerName) => {
      newReducers[reducerName] = function reducer(...payload) {
        dispatch({ type: `${name}/${reducerName}`, payload });
      };
    });
    state.now = {};
    const setLoading = function reducer(actionName, loading) {
      dispatch({
        type: `${name}/$SET_LOADING`,
        now: { ...getState()[name].now, [actionName]: loading },
      });
    };
    // actions
    const newActions = {};
    const realActions = actions({ dispatch: {} });
    let memoActions = null;
    Object.keys(realActions).forEach((actionName) => {
      if (isAsyncFn(realActions[actionName])) {
        state.now[actionName] = false;
        newActions[actionName] = async function asyncAction(...args) {
          if (!memoActions) memoActions = actions({ dispatch, getState });
          setLoading(actionName, true);
          const data = await memoActions[actionName].bind({})(...args);
          setLoading(actionName, false);
          return data;
        };
      } else {
        newActions[actionName] = function action(...args) {
          if (!memoActions) memoActions = actions({ dispatch, getState });
          return memoActions[actionName].bind({})(...args);
        };
      }
    });
    dispatch[name] = { ...newReducers, ...newActions };
  });

  return store;
};

export default createStore;
