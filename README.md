# Principles

This development process is a work in progress. If something stops working, please check back here for changes.

## Prerequisites

* NPM
* make

## Installation

Clone the repo into a directory, then inside that directory run:
```
npm install
```

## Compilation

The simplest way to generate output files from Idyll source is:
```
make
```

Once you do this, you'll want to run an HTTP server to view the output. Run:
```
make serve
```

You can edit files and re-run `make`. It will intelligently avoid re-compiling unchanged files. However, you will need to refresh your browser by hand after doing this.

If you run
```
make watch
```
then `make` will automatically re-run when you change the `src` directory. Nice!

(Idyll includes its own auto-reresh feature, but it doesn't work well with multiple source files, so we're not using it right now.)

## Publishing

To push output files to https://deprincipiis.github.io/principles/, run:
```
make publish
```

This will perhaps someday be included in the git workflow as a pre-commit / pre-push hook.
