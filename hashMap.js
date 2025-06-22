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
        }
        // Check if the bucket contains any data
        if (this.table[bucket].getSize() > 0) { // Linear probing LL.
            let index = this.table[bucket].find(data);
            if (index != null) {
                this.table[bucket].updateAt(data, index);  // This means that this is an update operation, not a collision.
            }
            else {
                this.table[bucket].append(data);  // Collision
                this.len++;
            }
        }
        else {  // No data
            this.table[bucket].append(data);
            this.bucketCount++;
            this.len++;
        }
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
                if (Object.values(dataObj)[0] == key) {
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
                if (Object.values(dataObj)[0] == key) {
                    this.table[bucket].removeAt(i);
                    this.len--;
                    return true;
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
        this.table = Array.from({ length: this.capacity }, () => new LinkedList());
        this.bucketCount = 0;
        this.len = 0; 
    }

    keys() {
        let reskeys = [];
        this.table.forEach((List) => {
            let node = List.head;
            let size = List.getSize();
            let i = 0;
            while (i <= size - 1) {
                reskeys.push(Object.values(JSON.parse(node.value))[0]);
                node = node.next;
                i++;
            }
        })
        return reskeys;
    }

    values() {
        let values = [];
        this.table.forEach((List) => {
            let node = List.head;
            let size = List.getSize();
            let i = 0;
            while (i <= size - 1) {
                values.push(Object.values(JSON.parse(node.value))[1]);
                node = node.next;
                i++;
            }
        })
        return values;
    }

    entries() {
        let entries = [];
        this.table.forEach((List) => {
            if (List.getSize()) {
                let node = List.head;
                let i = 0;
                while (i <= List.getSize() - 1) {
                    entries.push(Object.values(JSON.parse(node.value)));
                    i++;
                    node = node.next;
                }
            }
        })
        return entries;
    }

    reHash(oldData) {
        oldData.forEach((List) => {
            let size = List.getSize()
            if (size > 0) {
                // for (var i=0; i < size; i++) {
                let nodeList = List.unWrap();
                for (let node of nodeList) {
                    let dataObj = JSON.parse(node.value);
                    let vals = Object.values(dataObj);
                    // let key = Object.keys(dataObj);
                    // let val = Object.values(dataObj)
                    this.set(vals[0], vals[1]);
                }
                // }
            }
        })
    }

    expandHashMap() {
        this.capacity *= 2;
        this.bucketCount = 0;
        this.len = 0;
        let oldData = this.table;
        this.table = Array.from({ length: this.capacity }, () => new LinkedList());
        this.reHash(oldData);
    }

}