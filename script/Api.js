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

    addCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST', 
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(res => {
            if(res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }
    setUserInfo({ name, about }) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(res => {
            if(res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }
}