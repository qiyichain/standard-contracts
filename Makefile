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

.PHONY:deploy-mumbai
deploy-mumbai:
	npx hardhat run scripts/deploy-only.js --network mumbai

deploy-bsctestnet:
	npx hardhat run scripts/deploy-only.js --network bsctestnet

deploy-bsc:
	npx hardhat run scripts/deploy-only.js --network bsc

.PHONY:deploy-matic
deploy-matic:
	npx hardhat run scripts/deploy-only.js --network matic


test-qiyichain:
	yarn run hardhat test --network qiyichain

test-mumbai:
	yarn run hardhat test --network mumbai

test-bsctestnet:
	yarn run hardhat test --network bsctestnet

remix:
	remixd -s ./ -u https://remix.ethereum.org


flatten:
	 npx hardhat flatten ./contracts/StandardERC721A.sol  > StandardERC721A.sol
	 npx hardhat flatten ./contracts/DidProxy.sol  > DidProxy.sol