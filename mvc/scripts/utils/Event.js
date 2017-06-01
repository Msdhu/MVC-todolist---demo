const CustomEvent = {
    events: {},
    firedEventNames: {},
    gId: 0,
    // 处理自定义事件的名称
    eventPrefixArgs(args, prefix) {
        let data = args;
        if (data.length > 1) {
            data = data.slice(1);
        }
        // 改变自定义事件的名称
        data.unshift(`${prefix}_${args[0]}`);
        return data;
    },
    mix(srcObj, targetObj) {
        Object.keys(targetObj).forEach((key) => {
            if ({}.hasOwnProperty.call(targetObj, key) && !{}.hasOwnProperty.call(srcObj, key)) {
                srcObj[key] = targetObj[key];
            }
        });
    },
    genId() {
        this.gId += 1;
        return this.gId;
    }
};

const innerEvent = {
    on(name, handler) {
        CustomEvent.firedEventNames[name] = false;

        if (!(name in CustomEvent.events)) {
            CustomEvent.events[name] = [];
        }
        CustomEvent.events[name].push(handler);
    },

    off(name, handler) {
        if (!(name in CustomEvent.events) || CustomEvent.events[name].length === 0) {
            return;
        }

        const handlers = CustomEvent.events[name];
        let len = handlers.length;
        if (!handler) {
            handlers.splice(0, len);
        } else {
            for (let i = 0; i < len; i += 1) {
                if (handlers[i] === handler) {
                    handlers.splice(i, 1);

                    len = handlers.length;
                    i -= 1;
                }
            }
        }
    },

    once(name, handler) {
        const onceHandler = (...args) => {
            this.off(name, onceHandler);
            handler(...args);
        };

        return this.on(name, onceHandler);
    },

    fire(name, ...args) {
        if (!(name in CustomEvent.events) || CustomEvent.events[name].length === 0) {
            return;
        }
        CustomEvent.firedEventNames[name] = true;

        const handlers = CustomEvent.events[name];
        handlers.forEach((item) => {
            item(...args);
        });
    },

    isFired(name) {
        return CustomEvent.firedEventNames[name] === true;
    }
};
CustomEvent.innerEvent = innerEvent;

const normalEvent = {};
Object.keys(CustomEvent.innerEvent).forEach((item) => {
    normalEvent[item] = (...args) => CustomEvent.innerEvent[item](...CustomEvent.eventPrefixArgs(args, 'normalevent'));
});

export default function Event(target) {
    const evObj = {};

    if (!target._eventId) {
        target._eventId = CustomEvent.genId();
    }
    const evId = target._eventId;

    Object.keys(CustomEvent.innerEvent).forEach((item) => {
        evObj[item] = (...args) => CustomEvent.innerEvent[item](...CustomEvent.eventPrefixArgs(args, `objectevent_${evId}`));
    });

    return evObj;
}

Event.events = CustomEvent.events;
Event.firedEventNames = CustomEvent.firedEventNames;
CustomEvent.mix(Event, normalEvent);

