export interface ChangeCallbacks<K, V> {
    onSet?: (newItem: { key: K; value: V }) => void;
    onDelete?: (deletedItem: { key: K; value: V | undefined }) => void;
    onClear?: (deletedItems: [K, V][]) => void;
}

/** Creates a Proxy for the provided Map and allows to track whenever the developer called some method */
export function getMapProxy<K, V>(map: Map<K,V>, callbacks: ChangeCallbacks<K, V>): Map<K, V> {
    return new Proxy(map, {
        get(target, key: keyof Map<K,V>) {
            if (key === "set") {
                return function (k: K, value: V) {
                    if (callbacks.onSet) callbacks.onSet({ key: k, value });
                    return target[key](k, value);
                }
            }
            if (key === "delete") {
                return function (k: K) {
                    if (callbacks.onDelete) callbacks.onDelete({ key: k, value: target.get(k) });
                    return target[key](k);
                }
            }
            if (key === "clear") {
                return function (k: K) {
                    if (callbacks.onClear) callbacks.onClear(Array.from(target.entries()));
                    return target[key]();
                }
            }

            let value = target[key];
            return (typeof value === 'function') ? value.bind(target) : value;
        }
    });
}
