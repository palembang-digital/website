all: init build-ui build-server

init:
	@echo "> Installing dependencies ..."
	@go get -v ./...
	@go install github.com/markbates/pkger/cmd/pkger
	@cd ui && yarn

build-ui:
	@echo "> Building the UI ..."
	@cd ui && rm -rf build && yarn build

build-server:
	@echo "> Packaging the UI ..."
	@rm -rf pkged.go && pkger
	@echo "> Building the binary ..."
	@rm -rf bin && go build -o bin/patal main.go
