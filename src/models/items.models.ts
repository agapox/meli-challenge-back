import { Item, ItemOfItems, Items } from '../interfaces';

const itemsModel = (data: any): Items => {

    const getFilteredItems = (data: any): ItemOfItems[] => {
        return data.map((el: any) => {
            const {
                id, title, currency_id, price,
                thumbnail, condition, shipping
            }: {
                id: string, title: string,
                currency_id: string, price: number,
                thumbnail: string, condition: string,
                shipping: { free_shipping: boolean }
            } = el;
            return {
                id: id,
                title: title,
                price: {
                    currency: currency_id,
                    amount: price,
                    decimals: 0,
                },
                picture: thumbnail,
                condition: condition,
                free_shipping: shipping.free_shipping,
            }
        })
    }

    let filteredItems: ItemOfItems[] = getFilteredItems(data.results);

    const items: Items = {
        author: {
            name: 'Jose Agapito',
            lastname: 'Ramirez',
        },
        categories: data.categories,
        items: filteredItems,
    }

    return items;

}

const itemModel = (data: any): Item => {

    const item: Item = {
        author: {
            name: 'Jose Agapito',
            lastname: 'Ramirez',
        },
        item: {
            id: data.id,
            title: data.title,
            price: {
                currency: data.currency_id,
                amount: Number(data.price),
                decimals: 0,
            },
            picture: data.pictures[0].url,
            condition: data.condition,
            free_shipping: data.shipping.free_shipping,
            sold_quantity: data.sold_quantity,
            description: data.description,
            category: data.categories,
        }
    }

   
    return item;

}

const categoryItemModel = (data: any): string[] => {

    const { name, path_from_root } = data;

    return path_from_root.length > 0 ? path_from_root.map((el: any) => el.name) : name

}


export {
    itemsModel,
    itemModel,
    categoryItemModel,
}