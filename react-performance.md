# React Performance Optimization

- [x] react profiler
- [x] shouldComponentUpdate
- [x] PureComponents
- [x] react.memo, useMemo, useCallback
- [ ] immutable -> immer
- [ ] memoize selectors -> reselect
- [ ] action creators -> typesafe-actions
- [x] why did you update?
- [ ] bind the functions outside of render -> reduce reconciliations
- [ ] define constants outside of render -> reduce reconcialiations
- [ ] avoid inline function definition in the render function -> reduce reconciliations
- [x] react fragments (<>) to avoid additional html element wrappers
- [ ] throttling and debouncing
- [ ] react suspense
- [x] using webworkers for CPU extensive tasks -> sorting
- [ ] virtualize long lists
- [ ] consider server side rendering

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
