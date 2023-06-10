# Docker based Live Compiler

### Getting started

Just copy the source:

```bash
git clone -b live-compiler https://github.com/asmryz/online-compiler.git
```

Then run the following commands one by one:

```bash
cd online-compiler
npm i
```

You can start the dev server by running

```shell
npm run dev
```

This will fire up an Express server with live Webpack compilation and HMR.
Edit away!!

### Production

The process is pretty simple. First build the project:

```shell
npm run build
```

Then start the server with

```shell
npm start
```

That's all there is to it.
