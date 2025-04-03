class ItemService {
    constructor(itemRepo, paginationStrategy, paginationDirection) {
      this.itemRepo = itemRepo;
      this.paginationStrategy = paginationStrategy;
      this.paginationDirection = paginationDirection;
    }
  
    async getItems(cursorId, scrollVelocity) {

      // Initial item creation if needed
      // if (cursorId == 0 && scrollVelocity == 0){
      //   const items = await this.itemRepo.createInitialItems();
      //   return items;
      // }


      // Convert scroll speed to page size and getting direction
      const pageSize = this.paginationStrategy.calculatePageSize(scrollVelocity);
      const direction = this.paginationDirection.getDirection(scrollVelocity);
    
      // Get items from repository
      const items = await this.itemRepo.findCursor(cursorId, pageSize, direction); 
  
      return items;
    }
  
    async processCountUpdates(updates) {
      return this.itemRepo.bulkIncrementValues(updates);
    }
  }
  
module.exports = ItemService;