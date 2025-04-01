import CardApi from '../infrastructure/CardApi'

export default class CardServices{
    constructor(){
        this.repository = new CardApi();
        this.pendingUpdates = new Map();
    }

    async loadInitial() {
        return await this.repository.fetch(0, 0);
    }

    async loadMore(cursor, velocity) {
        return await this.repository.fetch(cursor, velocity);
    }

    queueUpdate(card){
        this.pendingUpdates.set(card.id, card.value);
    }

    async savePendingUpdates(){
        if (this.pendingUpdates.size > 0) {
            const updates = Array.from(this.pendingUpdates.entries())
              .map(([id, value]) => ({ id, value }));

            await this.repository.save(updates); //saving all update in single API call
            this.pendingUpdates.clear(); //Clearing update queue
        }
    }
}