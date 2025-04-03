class ScrollDirection{
    getDirection(scrollVelocity){
        return scrollVelocity >= 0 ? 'down' : 'up';
    }
}

module.exports = ScrollDirection;