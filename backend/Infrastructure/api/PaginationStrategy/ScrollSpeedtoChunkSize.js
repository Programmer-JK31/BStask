class ScrollSpeedtoChunkSize {
    calculatePageSize(scrollVelocity) {
      // USing Velocity(pixels/ms) to get page size (min:20- max:100 items)
      const normalized = Math.min(1, Math.abs(scrollVelocity) / 100);
      return Math.floor(20 + (80 * normalized));
    }
}
  
module.exports = ScrollSpeedtoChunkSize;