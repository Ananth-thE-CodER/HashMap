import { LinkedList } from "./linkedList.js";

export class HashMap {
    constructor(capacity=16, loadFactor=0.75) {
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.table = Array.from({ length: capacity }, () => new LinkedList());
        this.bucketCount = 0;
        this.len = 0;
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
            this.expandHashMap();
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
        this.len++;
    }
    
    get(key) {
        let bucket = this.hash(key);
        
        if (this.table[bucket].getSize() > 0) {
            let nodeList = this.table[bucket].unWrap();
            for (let node of nodeList) {
                let dataObj = JSON.parse(node.value);
                if (dataObj[Object.keys(dataObj)[0]] == key) {
                    return Object.values(dataObj)[1];
                }
            }
        }
        return null;
    }

    has(key) {
        let bucket = this.hash(key);
        
        if (this.table[bucket].getSize() > 0) {
            let nodeList = this.table[bucket].unWrap();
            for (let node of nodeList) {
                let dataObj = JSON.parse(node.value);
                if (Object.keys(dataObj)[0] == key) {
                    return true;
                }
            }
        }
        return false;
    }

    remove(key) {
        let bucket = this.hash(key);

        if (this.table[bucket].getSize() > 0) {
            let size = this.table[bucket].getSize();
            let i = 0;
            // let list = this.table[bucket];
            let node = this.table[bucket].head;
            let prevNode = null;
            while (i < size) {
                let dataObj = JSON.parse(node.value);
                if (Object.keys(dataObj)[0] == val) {
                    if (i == 0) {
                        this.table[bucket].head = this.table[bucket].head.next;
                        return true;
                    }
                    else {
                        prevNode.next = node.next;
                        return true;
                    }
                }
                prevNode = node;
                node = node.next;
            }
            return false;
        }
        return false;
    }

    length() {
        return this.len;
    }

    clear() {
        this.capacity = 16;
        this.table = Array.from({ length: capacity }, () => new LinkedList());
        this.bucketCount = 0;
        this.len = 0; 
    }

    keys() {
        let keys = [];
        this.table.forEach((List) => {
            let node = List.head;
            let size = List.getSize();
            let i = 0;
            while (i <= size - 1) {
                keys.concat(Object.keys(JSON.parse(node.value)));
            }
        })
        return keys;
    }

    values() {
        let values = [];
        this.table.forEach((List) => {
            let node = List.head;
            let size = List.getSize();
            let i = 0;
            while (i <= size - 1) {
                values.concat(Object.values(JSON.parse(node.value)));
            }
        })
        return values;
    }

    entries() {
        let entires = [];
        this.table.forEach((List) => {
            let i = 0;
            if (List.getSize()) {
                let node = List.head;
                let i = 0;
                while (i <= List.getSize() - 1) {
                    entires.push(Object.values(JSON.parse(node.value)));
                    i++;
                    node = node.next;
                }
            }
        })
        return entries;
    }

    reHash() {
        this.table.forEach((List) => {
            let size = List.getSize()
            if (size > 0) {
                for (var i=0; i < size; i++) {
                    let nodeList = List.unWrap();
                    for (let node of nodeList) {
                        let dataObj = JSON.parse(node.value);
                        let key = Object.keys(dataObj);
                        let val = Object.values(dataObj)
                        this.set(key[0], val[0]);
                    }
                }
            }
        })
    }

    expandHashMap() {
        this.capacity *= 2;
        this.bucketCount = 0;
        this.length = 0;
    }

}