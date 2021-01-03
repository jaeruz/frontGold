import axios from 'axios'

const ItemsURL = 'http://localhost:8000/api/item-list'; // sample URL from django
const createItemsURL = 'http://localhost:8000/api/item-create'; // sample URL from django


const createDetailsURL = 'http://localhost:8000/api/detail-create'; // sample URL from django

const postBarcodeURL ='http://localhost:8000/api/route-detail'

const AdminHeaders = {
        headers: {
            'Authorization': 'token ce551a2ffa2e04f2ebef39294977fdb6de20093e'
        }
    }


export const fetchItems = () => axios.get(ItemsURL, AdminHeaders)

export const createItems = (item) => axios.post(createItemsURL,item,AdminHeaders)

export const createDetails = (detail) => axios.post(createDetailsURL, detail, AdminHeaders)

export const postBarcode = (barcode) => axios.post(postBarcodeURL, barcode, AdminHeaders)
