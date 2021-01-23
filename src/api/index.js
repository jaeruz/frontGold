import axios from "axios"

const ItemsURL =
  window.location.protocol +
  "//" +
  window.location.hostname +
  ":8000/api/item-list" // sample URL from django
const createItemsURL =
  window.location.protocol +
  "//" +
  window.location.hostname +
  ":8000/api/item-create" // sample URL from django

const DetailsURL =
  window.location.protocol +
  "//" +
  window.location.hostname +
  ":8000/api/detail-list"
const createDetailsURL =
  window.location.protocol +
  "//" +
  window.location.hostname +
  ":8000/api/detail-create" // sample URL from django

const postBarcodeURL =
  window.location.protocol +
  "//" +
  window.location.hostname +
  ":8000/api/route-detail"

const undoScanURL =
  window.location.protocol +
  "//" +
  window.location.hostname +
  ":8000/api/route-undo"

const purchaseURL =
  window.location.protocol +
  "//" +
  window.location.hostname +
  ":8000/api/purchase-list"
const addPurchaseURL =
  window.location.protocol +
  "//" +
  window.location.hostname +
  ":8000/api/purchase-create"

const authURL =
  window.location.protocol + "//" + window.location.hostname + ":8000/api/login"

const logoutURL =
  window.location.protocol +
  "//" +
  window.location.hostname +
  ":8000/api/logout"

const routeTableURL =
  window.location.protocol +
  "//" +
  window.location.hostname +
  ":8000/api/route-table"

const statusTableURL =
  window.location.protocol +
  "//" +
  window.location.hostname +
  ":8000/api/status-table"

const statusListURL =
  window.location.protocol +
  "//" +
  window.location.hostname +
  ":8000/api/status-list"

//functions

export const fetchItems = () =>
  axios.get(ItemsURL, {
    headers: {
      Authorization:
        "token " + JSON.parse(window.localStorage.getItem("credentials")).token,
    },
  })

export const createItems = (item) =>
  axios.post(createItemsURL, item, {
    headers: {
      Authorization:
        "token " + JSON.parse(window.localStorage.getItem("credentials")).token,
    },
  })

export const fetchDetails = () =>
  axios.get(DetailsURL, {
    headers: {
      Authorization:
        "token " + JSON.parse(window.localStorage.getItem("credentials")).token,
    },
  })

export const createDetails = (detail) =>
  axios.post(createDetailsURL, detail, {
    headers: {
      Authorization:
        "token " + JSON.parse(window.localStorage.getItem("credentials")).token,
    },
  })

export const postBarcode = (barcode) =>
  axios.post(postBarcodeURL, barcode, {
    headers: {
      Authorization:
        "token " + JSON.parse(window.localStorage.getItem("credentials")).token,
    },
  })

export const undoScan = async (barcode) =>
  await axios.post(undoScanURL, barcode, {
    headers: {
      Authorization:
        "token " + JSON.parse(window.localStorage.getItem("credentials")).token,
    },
  })

export const fetchPurchase = () =>
  axios.get(purchaseURL, {
    headers: {
      Authorization:
        "token " + JSON.parse(window.localStorage.getItem("credentials")).token,
    },
  })

export const addPurchase = (purchase) =>
  axios.post(addPurchaseURL, purchase, {
    headers: {
      Authorization:
        "token " + JSON.parse(window.localStorage.getItem("credentials")).token,
    },
  })

//auth

export const postCreds = (creds) => axios.post(authURL, creds)

export const logout = () =>
  axios.post(logoutURL, null, {
    headers: {
      Authorization:
        "Token " + JSON.parse(window.localStorage.getItem("credentials")).token,
    },
  })

//dashboard

export const fetchRouteTable = () =>
  axios.get(routeTableURL, {
    headers: {
      Authorization:
        "token " + JSON.parse(window.localStorage.getItem("credentials")).token,
    },
  })

export const fetchStatusTable = () =>
  axios.get(statusTableURL, {
    headers: {
      Authorization:
        "token " + JSON.parse(window.localStorage.getItem("credentials")).token,
    },
  })

export const fetchStatusList = () =>
  axios.get(statusListURL, {
    headers: {
      Authorization:
        "token " + JSON.parse(window.localStorage.getItem("credentials")).token,
    },
  })
