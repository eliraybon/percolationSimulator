const UnionFind = require('./UnionFind');

class Percolation {
  constructor(n) {
    this.n = n;
    this.system = Array.from({ length: n }, () => new Array(n).fill(false));
    this.openSites = 0;
    this.uf = new UnionFind(n ** 2 + 2);
    this.backwash = new UnionFind(n ** 2 + 2);

    this.connectToSource(n);
    this.connectToSink(n);
  }

  open(row, col) {
    if (!this.system[row][col]) {
      this.system[row][col] = true;
      this.openSites++;
      this.connectOpenNeighbors(row, col);
    }
  }

  isOpen(row, col) {
    return this.system[row][col];
  }

  isFull(row, col) {
    return this.isOpen(row, col) && 
      this.backwash.isConnected(this.encode(row, col), 0);
  }

  percolates() {
    return this.uf.isConnected(0, this.n ** 2 + 1);
  }

  union(row, col) {
    this.uf.union(row, col);
    this.backwash.union(row, col);
  }

  connectOpenNeighbors(row, col) {
    this.connectTopNode(row, col);
    this.connectBottomNode(row, col);
    this.connectLeftNode(row, col);
    this.connectRightNode(row, col);
  }

  connectTopNode(row, col) {
    if (row - 1 >= 0 && this.isOpen(row - 1, col)) {
      this.union(this.encode(row, col), this.encode(row - 1, col));
    }
  }

  connectBottomNode(row, col) {
    if (row + 1 < this.n && this.isOpen(row + 1, col)) {
      this.union(this.encode(row, col), this.encode(row + 1, col));
    }
  }

  connectLeftNode(row, col) {
    if (col - 1 >= 0 && this.isOpen(row, col - 1)) {
      this.union(this.encode(row, col), this.encode(row, col - 1));
    }
  }

  connectRightNode(row, col) {
    if (col + 1 < this.n && this.isOpen(row, col + 1)) {
      this.union(this.encode(row, col), this.encode(row, col + 1));
    }
  }

  connectToSource(n) {
    for (let i = 0; i < n; i++) {
      const encoded = this.encode(0, i);
      this.uf.union(0, encoded);
      this.backwash.union(0, encoded);
    }
  }

  connectToSink(n) {
    for (let i = 0; i < n; i++) {
      this.uf.union(this.encode(n - 1, i), n ** 2 + 1)
    }
  }

  encode(row, col) {
    return (row * this.n) + col + 1;
  }

}

export default Percolation;
