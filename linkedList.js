import { Node } from "./nodes.js";

export class LinkedList {
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

    append(value) {
        let node = new Node(value);
        if (!this.head) {
            this.head = node;
        }
        else {
            this.tail.next = node;
        }
        this.size++; 
        this.tail = node;
    }

    getSize() {
        return this.size;
    }

    find(value) {
        let i = 0;
        let found = false;
        let index = null;
        let node = this.head;
        while (i <= this.size - 1) {
            if (node.value == value) {
                if (index == null) {
                    index = 0;
                }
                found = true;
                break;
            }
            node = node.next;
            if (index == null) index = 0;
            index++;
        }
        return index;
    }

    insertAt(value, index) {
        if (index < 0) console.log("Please enter a positive index.")
        let i = 1;
        let node = this.head;
        let newNode = new Node(value);
        if (index == 0) {
            newNode.next = this.head;
            this.size++;
            return;
        }
        while (i < index) {
            node = node.next;
            i++;
        }
        let nextNode = node.next;
        node.next = newNode;
        newNode.next = nextNode;
        this.size++;
    }

    unWrap() {
        let nodeArray = [];
        let i = 0;
        let node = this.head;
        while (i <= this.size) {
            if (node) {
                nodeArray.push(node)
            }
            node = node.next;
            i++;
        }
        return nodeArray;
    }
}