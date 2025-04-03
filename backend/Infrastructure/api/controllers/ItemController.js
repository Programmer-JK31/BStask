const createItemController = (itemService) => ({
    async getItems(req, res) {
      try {
        const { cursorId, scrollVelocity } = req.query;
        const items = await itemService.getItems(cursorId, scrollVelocity);
        
        res.json({
          items: items.map(item => item.toJSON()),
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  
    async updateCounts(req, res) {
      try {
        await itemService.processCountUpdates(req.body.updates);
        res.json({ success: true });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  });
  
module.exports = createItemController;