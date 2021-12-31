# vue-scaleable-app
A scaffolding for building huge Single Page Application but with short and constant building time! All components and routes dynamic import on-demand!.

## How it works
1. A script loader (requirejs).
1. A config file record the url of plugins and components and routes.
1. Declare A component in vue template and async import it with requirejs on render.
1. Build app and components(UMD standard) sparately with vue cli.


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### build component

```
npm run package src/components/HelloWorld.vue
```

### serve component indpendent
```
npm run serve src/components/HelloWrold.vue
```

## FAQ
1. Why not use webpack import() function or require.ensure()?
  Because webpack static analysis when using import() or require. It will spend more time.