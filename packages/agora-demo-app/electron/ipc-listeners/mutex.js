module.exports.Mutex = class Mutex {
  _mutex = Promise.resolve();

  lock() {
    let begin = () => {};

    this._mutex = this._mutex.then(() => {
      return new Promise(begin);
    });

    return new Promise((res) => {
      begin = res;
    });
  }

  async dispatch(fn) {
    const unlock = await this.lock();
    try {
      return await Promise.resolve(fn());
    } finally {
      unlock();
    }
  }
};
