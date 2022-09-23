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


remix:
	remixd -s ./ -u https://remix.ethereum.org


flatten:
	 npx hardhat flatten ./contracts/StandardERC721A.sol  > StandardERC721A.sol
	 npx hardhat flatten ./contracts/DidProxy.sol  > DidProxy.sol