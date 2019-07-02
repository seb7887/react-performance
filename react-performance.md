# React Performance Optimization

- [ ]react profiler
- [ ]shouldComponentUpdate
- [ ] PureComponents
- [ ] react.memo, useMemo, useCallback
- [ ] immutable -> immer
- [ ] memoize selectors -> reselect
- [ ] action creators -> typesafe-actions
- [ ] why did you update? (?)
- [ ] bind the functions outside of render -> reduce reconciliations
- [ ] define constants outside of render -> reduce reconcialiations
- [ ] avoid inline function definition in the render function -> reduce reconciliations
- [ ] conditionally firing useEffect hook `[something]` or never rerunning `[]`
- [ ] multiple chunks files (webpack)
- [ ] react fragments (<>) to avoid additional html element wrappers
- [ ] throttling and debouncing
- [ ] avoid using index as key for map
- [ ] avoid props in initial states
- [ ] spreading props on DOM elements
- [ ] react suspense
- [ ] using webworkers for CPU extensive tasks -> sorting
- [ ] virtualize long lists
- [ ] consider server side rendering
- [ ] font-display (mmm webpack)

## shouldComponentUpdate with React Hooks

```javascript
const Button = React.memo(props => {
  // your component
});
```

## Use immutable data structures

- For arrays use `[].concat` or ES6 `[...params]`
- For objects use `Object.assign({}, ...)` or ES6 `{...params}`
- But its better to use an optimized library
