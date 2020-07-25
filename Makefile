IMAGE := docker.io/mtinside/hlnl-be
TAG := latest

init:
	npm install

dev:
	node index.js

render-docker:
	docker build . -t $(IMAGE):$(TAG)

docker-push: render-docker
	docker push $(IMAGE):$(TAG)

run-docker: render-docker
	docker run -ti --rm --name hlnl-be \
	    -p8080:8080 \
	    $(IMAGE):$(TAG)
