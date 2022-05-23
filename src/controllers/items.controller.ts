import { response, request } from 'express';
import axios from 'axios';
import { categoryItemModel, itemModel, itemsModel } from '../models/items.models';

const externalApiBase = process.env.EXTERNAL_API;

const searchItems = async(req = request, res = response) => {
    
    const { query } = req;

    const limit = 4;
    
    try {
        const response = await axios.get(`${externalApiBase}sites/MLA/search?limit=${limit}&q=${query.q}`);

        const { filters, available_filters } = response.data;

        let catArr: string[] = [];

        if (filters[0]?.id === 'category') {
            catArr = filters.filter(({id}: {id: string}) => {
                return id === 'category';
            }).pop().values.map((cat: any) => {
                return cat.path_from_root;
            }).pop().map(({name}: {name: string}) => {
                return name;
            });
        } else {
            let catId = available_filters.filter(({id}: {id: string}) => {
                return id === 'category';
            }).pop().values.sort((a: any, b: any) => {
                return a.results - b.results;
            }).map(({id}: {id: string}) => {
                return id;
            }).pop();
            catArr = await getCategoryData(catId);
        }

        response.data.categories = catArr;

        const items = itemsModel(response.data)

        res.json(items);

    } catch (error: any) {

        console.error(error);

    }


}

const getItem = async (req = request, res = response) => {

    const { id } = req.params;

    try {
        const response = await axios.get(`${externalApiBase}items/${id}`);
        response.data.description = await getDescription(id);
        const catId = response.data.category_id;
        response.data.categories = await getCategoryData(catId);
        const item = itemModel(response.data);
        res.json(item);
    } catch (error) {
        console.error(error);
    }
}

const getDescription = async (id: string) => {
    const response = await axios.get(`${externalApiBase}items/${id}/description`);
    return response.data.plain_text;
}

const getCategoryData = async (catId: string) => {
    const response = await axios.get(`${externalApiBase}categories/${catId}`);
    return categoryItemModel(response.data);
}

export {
    searchItems,
    getItem
};