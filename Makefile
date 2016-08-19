start:
	npm install -g grunt-cli bower
	npm install
	grunt

docker:
	docker-compose up -d --build frontend

mock:
	docker-compose kill frontend
	docker-compose rm -f frontend
	docker-compose up -d mock-server
	docker-compose up -d --build frontend-mock
