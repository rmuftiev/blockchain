const SHA256 = require('crypto-js/sha256')

class Block {
        constructor(index, timestamp, data, previousHash = '') {
            this.index = index
            this.timestamp = timestamp
            this.data = data
            this.previousHash = previousHash
            this.hash = this.calculateHash()
        }
    
        calculateHash() {            
            return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString()
        }
    }
    
    
    class Blockchain {
        constructor() {
            this.chain = [this.createGenesisBlock()]
        }
    
        createGenesisBlock() {
            return new Block(0,'01/01/2022', 'Initial block data', '0')
        }
    
        getLatestBlock() {
            return this.chain[this.chain.length-1]
        }
    
        addBlock(newBlock) {
            newBlock.previousHash = this.getLatestBlock().hash
            newBlock.hash = newBlock.calculateHash()
            this.chain.push(newBlock)
        }
    
        isChainValid () {
            for (let i = 1; i < this.chain.length; i++) {
                const currentBlock = this.chain[i]
                const previousBlock = this.chain[i-1]
    
                if (currentBlock.hash !== currentBlock.calculateHash()) {
                    return false
                }
                if (previousBlock.hash !== currentBlock.previousHash) {
                    return false
                }
            }
    
            return true
        }
    }
    
    
    let testCoin = new Blockchain()
    testCoin.addBlock(new Block(1,'01/02/2022', 'Another block data 1'))
    testCoin.addBlock(new Block(2,'01/03/2022', 'Another block data 2'))
    
    console.log('Is chain valid? ' + testCoin.isChainValid())
    console.log(JSON.stringify(testCoin, null, 4))    