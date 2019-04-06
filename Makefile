MAKEFLAGS+=-r
.SUFFIXES:

NODE_BIN = node_modules/.bin
IDYLL = $(NODE_BIN)/idyll ${IDYLL_FLAGS}

COMMON_DEPS = components
TOPICS = $(patsubst src/%/index.idyll,%,$(shell ls src/*/index.idyll))

build: build/index.html $(patsubst %,build/%/index.html,$(TOPICS))

build/index.html: src/index.idyll $(shell find src/static) $(COMMON_DEPS)
	$(IDYLL) build -i $< --static src/static -o build

define make-topic
build/$(1)/index.html: $(shell find src/$(1)) $(COMMON_DEPS)
	$(IDYLL) build \
		-i src/$(1)/index.idyll  \
		--static src/$(1)/static \
		--components components src/$(1)/components \
		-o build/$(1)
endef
$(foreach TOPIC,$(TOPICS),$(eval $(call make-topic,$(TOPIC))))

clean:
	rm -rf build

watch:
	./watch.sh

serve: build
	$(NODE_BIN)/http-server build

publish: build
	$(NODE_BIN)/gh-pages -d build