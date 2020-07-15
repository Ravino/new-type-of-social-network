run:
	docker run -f frontend/docker/front-nginx/Dockerfile .

build:
	docker build -f frontend/docker/front-nginx/Dockerfile .
