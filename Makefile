identifier=com.14lines.Paw.XPathDynamicValue
extensions_dir=$(HOME)/Library/Containers/com.luckymarmot.Paw/Data/Library/Application Support/com.luckymarmot.Paw/Extensions/

build:
	npm run build
	cp README.md LICENSE ./dist/

clean:
	rm -Rf ./dist/

install: clean build
	mkdir -p "$(extensions_dir)$(identifier)/"
	cp -r ./dist/* "$(extensions_dir)$(identifier)/"

test:
	npm test

archive: build
	cd ./build/; zip -r DigestAuthDynamicValue.zip "$(identifier)/"
