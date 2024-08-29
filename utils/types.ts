export interface Addon {
    foodName: string,
    price: number
}

export interface CategoryListItemProps {
    foodName: string,
    addons: Addon[],
    price: number,
    id: number,
    category: string
}

export interface CreateMenuItemData {
    name: string,
    category: string,
    price: number,
    preparation_time: string,
    add_ons?: Addon[],
    quantity: number
}

export interface MenuItem extends CreateMenuItemData {
    id: number
}