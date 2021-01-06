import axios from 'axios'

const ItemsURL = 'http://localhost:8000/api/item-list'; // sample URL from django
const createItemsURL = 'http://localhost:8000/api/item-create'; // sample URL from django

const DetailsURL = 'http://localhost:8000/api/detail-list';
const createDetailsURL = 'http://localhost:8000/api/detail-create'; // sample URL from django

const postBarcodeURL = 'http://localhost:8000/api/route-detail'

const purchaseURL = 'http://localhost:8000/api/purchase-list'
const addPurchaseURL = 'http://localhost:8000/api/purchase-create'


const AdminHeaders = {
        headers: {
            'Authorization': 'token f98e07597ff8cf5cf19a29d9e402ab4dd2795c10'
        }
    }


export const fetchItems = () => axios.get(ItemsURL, AdminHeaders)

export const createItems = (item) => axios.post(createItemsURL, item, AdminHeaders)


export const fetchDetails = () => axios.get(DetailsURL, AdminHeaders)

export const createDetails = (detail) => axios.post(createDetailsURL, detail, AdminHeaders)

export const postBarcode = (barcode) => axios.post(postBarcodeURL, barcode, AdminHeaders)

export const fetchPurchase = () => axios.get(purchaseURL, AdminHeaders)

export const addPurchase = (purchase) => axios.post(addPurchaseURL,purchase, AdminHeaders)
