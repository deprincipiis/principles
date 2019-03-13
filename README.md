# Principles

This development process is a work in progress. If something stops working, please check back here for changes.

## Prerequisites

* NPM
* make

## Installation

Initial set-up:
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

(Idyll includes a nice auto-reresh feature, but it doesn't work so well with multiple source files. If you'd like to give it a try, run `make watch`.)