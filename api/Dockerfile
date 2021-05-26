FROM golang:1.16.0-alpine3.13
COPY . /app
WORKDIR /app
EXPOSE 3010
RUN CGO_ENABLED=0 GOOS=linux go build -o main
CMD ["./main"]
