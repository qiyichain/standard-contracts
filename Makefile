all: compile

.PHONY:compile
compile: clean
	yarn compile

.PHONY:test
test:clean
	yarn test

.PHONY:clean
clean:
	yarn clean
	rm -rf cache

.PHONY:deploy
deploy:
	npx hardhat run scripts/deploy.js --network qiyichain


test-qiyichain:
	yarn test-qiyichain