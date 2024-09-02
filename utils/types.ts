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

export enum SupabaseTables {
    Profiles = "profiles",
    Restaurants = "restaurants",
    MenuItems = "menu_items",
    RestaurantStaff = "restaurant-staff",
    Orders = "orders",
    OrderItems = "order_items"
}

export enum OrderStatus {
    New = 0,
    Preparing = 1,
    Completed = 2,
    Cancelled = 3,
    Collected = 4
}
