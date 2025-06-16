class HashMap {
    constructor(capacity=16, loadFactor=0.75) {
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.table = new Array(capacity);
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    set(key, value) {
        let bucket = this.hash(key);
        this.table[bucket] = value; 
    }

}