import { response, request } from 'express';
import axios from 'axios';

const externalApiBase = process.env.EXTERNAL_API;

const searchItems = async(req = request, res = response) => {
    
    const { query } = req;
    
    try {
        const response = await axios.get(`${externalApiBase}sites/MLA/search?q=${query.q}`);
        res.json(response.data);
    } catch (error: any) {
        console.error(error);
    }


}

const getItem = async (req = request, res = response) => {

    const { id } = req.params;

    try {
        const response = await axios.get(`${externalApiBase}items/${id}`);
        res.json(response.data);
    } catch (error) {
        console.error(error)
    }
}

export {
    searchItems,
    getItem
};