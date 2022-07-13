/**
 * 同步
 */
class EventEmit {
    events = {}

    constructor() {
    }

    on(eventName, callback) {
        if (!this.events[eventName]) this.events[eventName] = []
        this.events[eventName].push(callback)
    }

    once(eventName, callback) {
        function one() {
            callback.apply(this, arguments)
            this.off(eventName, one)
        }
        this.on(eventName, one)
    }

    off(eventName, callback) {
        if (!this.events[eventName]) return

        this.events[eventName] = this.events[eventName].filter(fn => fn !== callback)
    }

    emit(eventName, ...rest) {
        if (!this.events[eventName]) return
        this.events[eventName].forEach(fn => {
            fn.apply(this, rest)
        })
    }
}

class Person extends EventEmit {
    name = 'yt'

}

const person = new Person()
person.once('die', function(a, b, c) { console.log(this, a, b, c, 'die')})
person.emit('die', 1,2,3)
