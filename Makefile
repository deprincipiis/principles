NODE_BIN = node_modules/.bin
COMMON_DEPS = $(shell find components)


build: build/index.html build/emergence/index.html build/abstraction/index.html build/phase-transition/index.html

build/index.html: src/index.idyll $(shell find src/static) $(COMMON_DEPS)
	$(NODE_BIN)/idyll build --no-ssr=true -i $< --static src/static -o build

build/emergence/index.html: src/emergence/index.idyll $(shell find src/emergence/static) $(COMMON_DEPS)
	$(NODE_BIN)/idyll build --no-ssr=true -i $< --static src/emergence/static -o build/emergence

build/abstraction/index.html: src/abstraction/index.idyll $(shell find src/abstraction/static) $(COMMON_DEPS)
	$(NODE_BIN)/idyll build --no-ssr=true -i $< --static src/abstraction/static -o build/abstraction

build/phase-transition/index.html: src/phase-transition/index.idyll $(shell find src/phase-transition/static) $(COMMON_DEPS)
	$(NODE_BIN)/idyll build --no-ssr=true -i $< --static src/phase-transition/static -o build/phase-transition

clean:
	rm -rf build

watch:
	$(NODE_BIN)/watch make src components

serve: build
	$(NODE_BIN)/http-server build

publish: build
	$(NODE_BIN)/gh-pages -d build