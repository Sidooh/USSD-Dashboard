const prefix = 'sidooh'

class LocalStorage {
    static set(key: string, value: any) {
        localStorage.setItem(`${prefix}:${key}`, value)
    }

    static get(key: string, defaultValue: any, {deserialize = JSON.parse}) {
        const value = localStorage.getItem(`${prefix}:${key}`)
        return value !== null ? (typeof deserialize === "function" ? deserialize(value) : value) : defaultValue
    }

    static remove(key: string) {
        localStorage.removeItem(`${prefix}:${key}`)
    }
}

export default LocalStorage