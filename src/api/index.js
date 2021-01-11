import axios from 'axios'

const ItemsURL = 'http://localhost:8000/api/item-list'; // sample URL from django
const createItemsURL = 'http://localhost:8000/api/item-create'; // sample URL from django

const DetailsURL = 'http://localhost:8000/api/detail-list';
const createDetailsURL = 'http://localhost:8000/api/detail-create'; // sample URL from django

const postBarcodeURL = 'http://localhost:8000/api/route-detail'

const undoScanURL = "http://localhost:8000/api/route-undo"

const purchaseURL = 'http://localhost:8000/api/purchase-list'
const addPurchaseURL = 'http://localhost:8000/api/purchase-create'

const authURL = "http://localhost:8000/api/login"

const logoutURL = "http://localhost:8000/api/logout"




// const AdminHeaders = {
//         headers: {
//             'Authorization': 'token '+ JSON.parse(window.localStorage.getItem("credentials")).token
//         }
//     }
    
// console.log(AdminHeaders)

export const fetchItems = () => axios.get(ItemsURL, {
        headers: {
            'Authorization': 'token '+ JSON.parse(window.localStorage.getItem("credentials")).token
        }
    })

export const createItems = (item) => axios.post(createItemsURL, item, {
        headers: {
            'Authorization': 'token '+ JSON.parse(window.localStorage.getItem("credentials")).token
        }
    })

export const fetchDetails = () => axios.get(DetailsURL, {
        headers: {
            'Authorization': 'token '+ JSON.parse(window.localStorage.getItem("credentials")).token
        }
    })

export const createDetails = (detail) => axios.post(createDetailsURL, detail, {
        headers: {
            'Authorization': 'token '+ JSON.parse(window.localStorage.getItem("credentials")).token
        }
})
    


export const postBarcode = (barcode) => axios.post(postBarcodeURL, barcode, {
        headers: {
            'Authorization': 'token '+ JSON.parse(window.localStorage.getItem("credentials")).token
        }
    }) 
    
export const undoScan = (barcode) => axios.post(undoScanURL, barcode, {
        headers: {
            'Authorization': 'token '+ JSON.parse(window.localStorage.getItem("credentials")).token
        }
    })




export const fetchPurchase = () => axios.get(purchaseURL, {
        headers: {
            'Authorization': 'token '+ JSON.parse(window.localStorage.getItem("credentials")).token
        }
    })

export const addPurchase = (purchase) => axios.post(addPurchaseURL, purchase, {
        headers: {
            'Authorization': 'token '+ JSON.parse(window.localStorage.getItem("credentials")).token
        }
})
    

//auth

export const postCreds = (creds) => axios.post(authURL, creds)

export const logout = () => axios.post(logoutURL,null,{
        headers: {
            'Authorization': 'Token '+ JSON.parse(window.localStorage.getItem("credentials")).token
        }
    })
