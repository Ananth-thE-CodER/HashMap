import { LinkedList } from "./linkedList.js";

class HashMap {
    constructor(capacity=16, loadFactor=0.75) {
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.table = Array.from({ length: capacity }, () => new LinkedList());
        this.bucketCount = 0;
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
        let data = JSON.stringify({key, value});

        if ((this.bucketCount / this.capacity) > this.loadFactor) {
            this.reHash();
        }
        // Check if the bucket contains any data
        if (this.table[bucket].getSize() > 0) { // Linear probing LL.
            let index = this.table[bucket].find(data);
            if (index) {
                this.table[bucket].insertAt(data, index);  // This means that this is an update operation, not a collision.
            }
            else {
                this.table[bucket].append(data);  // Collision
            }
        }
        else {  // No data
            this.table[bucket].append(data);
            this.bucketCount++;
        }
    }

    reHash() {
        this.table.forEach((List) => {
            let size = List.getSize()
            if (size > 0) {
                for (var i=0; i < size; i++) {
                    // Store list items as array, then rehash. Also delete this comment.
                    let head = List.head;
                }
            }
        })
    }

}