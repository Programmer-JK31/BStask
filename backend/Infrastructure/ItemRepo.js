// File for communication between domain specific entities
// and Databases

const ItemModel = require('../models/itemModel');
const Item = require('../domain/items/Item');

class ItemRepo{

    // Creating initial items
    async createInitialItems(count = 10) {
        const items = Array.from({ length: count }, () => ({
          value: 0 //initial values
        }));
        
        const result = await ItemModel.insertMany(items);
        return result.map(doc => new Item({
          id: doc._id,
          value: doc.value
        }));
    }

    // Implementation of Pagination
    async findCursor(cursorId, limit, direction) {
        // query to DB with condition of pagination
        const query = cursorId !== '0' ? { _id: direction === 'down' ? { $gt: cursorId } : { $lt: cursorId } } : {};
        
        // DB query execution
        let docs = await ItemModel.find(query)
          .sort({ _id: 1 })
          .limit(limit)
          .lean(); 
        
        // if number of items are less than pagination limit
        if(direction === 'down' && docs.length < limit){
            const needed = limit - docs.length;
            const items = Array.from({ length: needed }, () => ({
              value: 0 //initial values
            }));
            const newDocs = await ItemModel.insertMany(
                items,
                { ordered: false }
            );
            docs = [...docs, ...newDocs];
        }

        // Converting data to domain entities
        return docs.map(doc => new Item({
          id: doc._id,
          value: doc.value
        }));

    }

    // In single query whole set should be updated
    async bulkIncrementValues(updates) {
        // Creating bulk write operation
        const bulkOps = updates.map(({ id, value }) => ({
          updateOne: {
            filter: { _id: id },
            update: { $set: { value: value } }
          }
        }));
    
        // Execute as single query
        const result = await ItemModel.bulkWrite(bulkOps, { ordered: false });
    }
}

module.exports = ItemRepo;