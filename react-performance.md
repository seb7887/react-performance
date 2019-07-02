# React Performance Optimization

- [x] react profiler
- [x] shouldComponentUpdate
- [x] PureComponents
- [x] react.memo, useMemo, useCallback
- [x] immutable -> immer
- [x] memoize selectors -> reselect
- [x] why did you update?
- [x] bind the functions outside of render -> reduce reconciliations
- [x] define constants outside of render -> reduce reconcialiations
- [x] avoid inline function definition in the render function -> reduce reconciliations
- [x] react fragments (<>) to avoid additional html element wrappers
- [x] throttling and debouncing
- [x] react suspense
- [x] using webworkers for CPU extensive tasks -> sorting
- [x] virtualize long lists

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
