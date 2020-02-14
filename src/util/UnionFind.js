class UnionFind {
  constructor(n) {
    this.n = n;
    this.ids = [...Array(n).keys()]
    this.sizes = new Array(n).fill(1);
  }

  union(x, y) {
    const root_x = this.root(x);
    const root_y = this.root(y);
    if (root_x === root_y) return;
    if (this.sizes[root_x] < this.sizes[root_y]) {
      this.ids[root_x] = this.ids[root_y];
      this.sizes[root_y] += this.sizes[root_x];
    } else {
      this.ids[root_y] = this.ids[root_x];
      this.sizes[root_x] += this.sizes[root_y];
    }
  }

  find(x, y) {
    return this.root(x) === this.root(y);
  }

  root(x) {
    while (x != this.ids[x]) {
      this.ids[x] = this.ids[this.ids[x]];
      x = this.ids[x];
    }
    return x;
  }
}