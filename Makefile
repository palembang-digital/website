include .env.sample
export

API_DOCS_PATH = api/v1/docs
BIN_NAME=patal
UI_PATH = ui

all: init test build

.PHONY: setup
setup:
	@echo "> Setting up tools ..."
	@test -x ${GOPATH}/bin/swag || go get -u github.com/swaggo/swag/cmd/swag

.PHONY: init
init: init-ui init-server

.PHONY: init-ui
init-ui:
	@echo "> Installing the UI dependencies ..."
	@cd ${UI_PATH} && yarn

.PHONY: init-server
init-server:
	@echo "> Installing the server dependencies ..."
	@go mod tidy -v
	@go get -v ./...

.PHONY: test
test: test-ui test-server

.PHONY: test-ui
test-ui:
	@echo "> Testing the UI source code ..."
	@cd ${UI_PATH} && yarn test --coverage --watchAll=false

.PHONY: test-server
test-server:
	@echo "> Testing the server source code ..."
	@go test -cover -covermode atomic -coverprofile cover.out -race ./...
	@go tool cover -func cover.out

.PHONY: build
build: build-ui build-server

.PHONY: build-ui
build-ui:
	@echo "> Building the UI ..."
	@cd ${UI_PATH} && rm -rf build && yarn build

.PHONY: build-server
build-server: gen-swagger
	@echo "> Building the server binary ..."
	@rm -rf bin && go build -o bin/${BIN_NAME} .

.PHONY: run
run:
	@echo "> Running application ..."
	@./bin/${BIN_NAME}

.PHONY: lint-ui
lint-ui:
	@echo "> Linting the UI source code ..."
	@cd ${UI_PATH} && yarn lint

.PHONY: gen-swagger
gen-swagger:
	@echo "Updating API documentation..."
	@rm -rf ${API_DOCS_PATH}
	@swag init -o ${API_DOCS_PATH}

.PHONY: local-db
local-db:
	@echo "> Starting up local database ..."
	@docker-compose up -d postgres
