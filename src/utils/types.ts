import {Model} from "@nabcellent/sui-vue";

export type Session = Model & {
    id: string,
    session_id: string,
    phone: string,
    text: string,
    code?: string,
    status: string,
    product: number,
    created_at: Date,
    updated_at: Date,
    screen_path: {},
    vars: {}
}


export type Setting = Model & {
    name: string,
    value: string,
}