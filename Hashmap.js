class HashMap {
    constructor(initialCapacity = 10, loadFactor = 0.75) {
        this.buckets = new Array(initialCapacity);
        this.size = 0;
        this.loadFactor = loadFactor;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode =
                (primeNumber * hashCode + key.charCodeAt(i)) %
                this.buckets.length;
        }
        return hashCode;
    }

    set(key, value) {
        const index = this.hash(key);
        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }
        for (let pair of this.buckets[index]) {
            if (pair[0] === key) {
                pair[1] = value;
                return;
            }
        }
        this.buckets[index].push([key, value]);
        this.size++;

        if (this.size > this.loadFactor * this.buckets.length) {
            this.growBucket();
        }
    }

    get(key) {
        const index = this.hash(key);
        if (!this.buckets[index]) return null;
        for (let pair of this.buckets[index]) {
            if (pair[0] === key) {
                return pair[1];
            }
        }
        return null;
    }

    has(key) {
        const index = this.hash(key);
        if (!this.buckets[index]) return false;
        for (let pair of this.buckets[index]) {
            if (pair[0] === key) {
                return true;
            }
        }
        return false;
    }

    remove(key) {
        const index = this.hash(key);
        if (!this.buckets[index]) return false;
        const bucket = this.buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = new Array(10);
        this.size = 0;
    }

    values() {
        const valuesArray = [];
        for (let bucket of this.buckets) {
            for (let pair of bucket) {
                valuesArray.push(pair[1]);
            }
        }
        return valuesArray;
    }

    entries() {
        const entriesArray = [];
        for (let bucket of this.buckets) {
            for (let pair of bucket) {
                entriesArray.push(pair);
            }
        }
        return entriesArray;
    }

    growBucket() {
      const newCapacity = this.buckets.length * 2;
      const newBuckets = new Array(newCapacity);
      for (let bucket of this.buckets) {
        if (bucket) {
          for (let pair of bucket) {
            const [key, value] = pair;
            const newIndex = this.hash(key) % newCapacity;
            if (!newBuckets[newIndex]) {
              newBuckets[newIndex] = [];
            }
            newBuckets[newIndex].push([key, value]);
          }
        }
      }
      this.buckets = newBuckets;
    }
}
