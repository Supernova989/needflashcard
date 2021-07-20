FROM golang:1.16.6-alpine3.14
COPY . /app
WORKDIR /app
EXPOSE 3010
RUN CGO_ENABLED=0 GOOS=linux go build -o main
CMD ["./main", "--production"]
