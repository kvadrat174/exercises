// # create nodes
//     nodeA = TNode("a")
//     nodeB = TNode("b")
//     nodeC = TNode("c")
//     nodeD = TNode("d")
//     nodeE = TNode("e")
//     nodeF = TNode("f")

//     # build the tree
//     nodeA.addChild(nodeB)
//     nodeA.addChild(nodeC)
//     nodeA.addChild(nodeD)
//     nodeD.addChild(nodeE)
//     nodeE.addChild(nodeF)

//     # test your code
//     print(nodeA.has(“a")) # true
//     print(nodeA.has(“b")) # true
//     print(nodeA.has(“f")) # true
//     print(nodeB.has(“f")) # false
//     print(nodeD.has(“f")) # true


class TNode {
    name: string;
    childs: Record<string, any>;
    queue: Array<any>;

    constructor(name: string) {
        this.name = name;
        this.childs = {};
        this.queue = [];
    }

    refreshQueue() {
        this.queue = Object.keys(this.childs).length > 0 ? Object.entries(this.childs) : []
    }

    addChild(Nodename: TNode) {
        this.childs[Nodename.name] = Nodename.childs
        this.queue = Object.keys(this.childs).length > 0 ? Object.entries(this.childs) : []
    }

    has(name: string) {

        if (this.queue.length === 0) {
            this.refreshQueue()
            return false
        }
        if (this.name === name) {
            this.refreshQueue()
            return true
        }
        const node = this.queue.shift();
        if (node[0] === name) {
            this.refreshQueue()
            return true
        }
        else {
            if (Object.keys(node[1]).length) {
                Object.keys(node[1]).forEach(key => {
                    this.queue.push([key, node[1][key]])
                })
            }
            return this.has(name)
        }

    }
}

const nodeA = new TNode("a")
const nodeB = new TNode("b")
const nodeC = new TNode("c")
const nodeD = new TNode("d")
const nodeE = new TNode("e")
const nodeF = new TNode("f")


nodeA.addChild(nodeB)
nodeA.addChild(nodeC)
nodeA.addChild(nodeD)
nodeD.addChild(nodeE)
nodeE.addChild(nodeF)

// test your code
console.log(nodeA.has('a')) // true
console.log(nodeA.has("b")) // true
console.log(nodeA.has("f")) // true
console.log(nodeB.has("f")) // false
console.log(nodeD.has("f")) // true