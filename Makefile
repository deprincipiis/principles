NODE_BIN = node_modules/.bin


build: build/index.html build/emergence/index.html build/abstraction/index.html build/phase-transition/index.html

build/index.html: src/index.idyll $(shell find src/static)
	$(NODE_BIN)/idyll build --no-ssr=true -i $< --static src/static -o build

build/emergence/index.html: src/emergence/index.idyll $(shell find src/emergence/static)
	$(NODE_BIN)/idyll build --no-ssr=true -i $< --static src/emergence/static -o build/emergence

build/abstraction/index.html: src/abstraction/index.idyll $(shell find src/abstraction/static)
	$(NODE_BIN)/idyll build --no-ssr=true -i $< --static src/abstraction/static -o build/abstraction

build/phase-transition/index.html: src/phase-transition/index.idyll $(shell find src/phase-transition/static)
	$(NODE_BIN)/idyll build --no-ssr=true -i $< --static src/phase-transition/static -o build/phase-transition

clean:
	rm -rf build

watch:
	$(NODE_BIN)/idyll --no-ssr=true -i src/index.idyll --static src/_static -o build
	$(NODE_BIN)/idyll --no-ssr=true -i src/emergence/index.idyll --static src/emergence/static -o build/emergence
	$(NODE_BIN)/idyll --no-ssr=true -i src/abstraction/index.idyll --static src/abstraction/static -o build/abstraction
	$(NODE_BIN)/idyll --no-ssr=true -i src/phase-transition/index.idyll --static src/phase-transition/static -o build/phase-transition

serve: build
	$(NODE_BIN)/http-server build

publish: build
	$(NODE_BIN)/gh-pages -d build