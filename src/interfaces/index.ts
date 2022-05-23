export interface Items {
    author: {
        name: string;
        lastname: string;
    };
    categories: string[];
    items: ItemOfItems[];
}

export interface ItemOfItems {
    id: string;
    title: string;
    price: {
        currency: string;
        amount: number;
        decimals: number;
    };
    picture: string;
    condition: string;
    free_shipping: boolean;
}

export interface Item {
    author: {
        name: string;
        lastname: string;
    };
    item: {
        id: string;
        title: string;
        price: {
            currency: string;
            amount: number;
            decimals: number;
        }
        picture: string;
        condition: string;
        free_shipping: boolean;
        sold_quantity: number;
        description: string;
        category: string[];
    };
}
