# Webpack Performance Optimization

## webpack-dev-server

A good first step towards a better development environment is to use webpack in its **watch** mode. **webpack-dev-server** is a server running in-memory, meaning the bundle contents aren't written out to files but stored in memory. The distinction is important when trying to debug code and styles.
By default **webpack-dev-server** refreshes content automatically in the browser while you develop your application, so you don't have to do it yourself
To get started with **webpack-dev-server**, install first

```
npm i -D webpack-dev-server
```

You must attach it to the project

```json
"scripts": {
  "start": "webpack-dev-server --env.mode development"
}
```
