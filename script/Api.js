export default class Api {
    constructor({url, headers}) {
        this._url = url
        this._headers = headers
    }

    getAllInfo() {
        return Promise.all(this.getUserInfo, this.getCards);
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        })
        .then(res => {
            if (res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
        .then(res => {
            if (res.ok){
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }
}