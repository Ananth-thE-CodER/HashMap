import { Node } from "./nodes.js";

class LinkedList {
    constructor() {
        this.size = 0;
        this.head = null;
        this.tail = null;
    }

    prepend(value) {
        let node = new Node(value);
        if (!this.head) {
            this.head = node;
        }
        else {
            let head = this.head;
            this.head = node;
            this.head.next = head;
        }
        this.size++;
    }
}