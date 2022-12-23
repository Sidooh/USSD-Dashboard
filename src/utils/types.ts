import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { RouteLocationRaw } from "vue-router";

type RouteChildType = {
    name: string
    to: RouteLocationRaw
    active?: boolean
    icon?: IconDefinition
    children?: RouteChildType[]
}
export type RouteType = {
    label?: string
    children: RouteChildType[]
}
type Model = {
    id?: number
    created_at?: string
    updated_at?: string
}

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
    screen_path: Object,
    vars: Object
}