class ScrollDirection{
    getDirection(scrollVelocity){
        return scrollVelocity > 0 ? 'up' : 'down';
    }
}

module.exports = ScrollDirection;