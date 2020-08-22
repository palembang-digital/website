API_DOCS_PATH = api/v1/docs
UI_PATH = ui

all: init test build

.PHONY: init
init:
	@echo "> Installing dependencies ..."
	@go mod tidy -v
	@go get -v ./...
	@go install github.com/swaggo/swag/cmd/swag
	@cd ${UI_PATH} && yarn

.PHONY: test
test: ui-test server-test

.PHONY: ui-test
ui-test:
	@echo "> Testing the UI source code ..."
	@cd ${UI_PATH} && yarn test --coverage --watchAll=false

.PHONY: server-test
server-test:
	@echo "> Testing the server source code ..."
	@go test -cover -coverprofile cover.out -race ./...
	@go tool cover -func cover.out

.PHONY: build
build: ui-build server-build

.PHONY: ui-build
ui-build:
	@echo "> Building the UI ..."
	@cd ${UI_PATH} && rm -rf build && yarn build

.PHONY: server-build
server-build: gen-swagger
	@echo "> Building the server binary ..."
	@rm -rf bin && go build -o bin/patal .

.PHONY: ui-lint-fix
ui-lint-fix:
	@echo "> Linting the UI source code ..."
	@cd ${UI_PATH} && yarn lint

.PHONY: gen-swagger
gen-swagger:
	@echo "Updating API documentation..."
	@rm -rf ${API_DOCS_PATH}
	@swag init -o ${API_DOCS_PATH}
