export interface Addon {
    foodName: string,
    price: number
}

export interface CategoryListItemProps {
    foodName: string,
    addons: Addon[],
    price: number,
    id: number,
    category: string,
    quantity: number,
}

export interface CreateMenuItemData {
    name: string,
    category: string,
    price: number,
    preparation_time: string,
    add_ons?: Addon[],
    quantity: number,
    opening_stock_value: number,
    restocking_value: number,
    warning_stock_value: number,
}

export interface ResturantData {
    id?: number,
    admin_id: string,
    name: string,
    phone_number?: string,
    website_link?: string,
    is_closed?: boolean,
    subaccount_code?: string,
    account_number?: string,
    image_url?: string
}

export interface ICreateSubaccount {
    bank_code: string,
    account_number: string,
    percentage_charge?: number,
    business_name: string
}

export interface MenuItem extends CreateMenuItemData {
    id: number,
    is_deleted?: boolean,
    is_disabled?: boolean
}

export interface Order {
    id: number,
    status: number,
    total_amount: number,
    order_date: Date | string,
    customer_name: string,
    preparation_time: number,
    start_time: Date | number,
    items: {
        id: number,
        quantity: number,
        addon_price?: number,
        addon_name?: string,
        menu_item: {
            name: string,
            price: number,
            category: string
        }
    }[]
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
    Accepted = 1,
    Preparing = 2,
    Completed = 3,
    Collected = 4,
    Cancelled = 5,
}
