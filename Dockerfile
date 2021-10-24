FROM node:14-alpine as node-builder
WORKDIR /src/ui
COPY ui .
RUN yarn
RUN yarn build

FROM golang:1.16-alpine as go-builder
WORKDIR /src
COPY . .
COPY --from=node-builder /src/ui/build ./ui/build
RUN go build -o bin/patal .

FROM alpine:3.12
COPY --from=node-builder /src/ui/build ./ui/build
COPY --from=go-builder /src/bin/patal .
COPY sql sql
CMD ["./patal"]
