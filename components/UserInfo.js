import { config } from "../utils/constants";

export default class UserInfo{
    constructor(data) {
        this._name = document.querySelector(data.name);
        this._about = document.querySelector(data.about);
        this._photo = document.querySelector(data.photo);
    }
    getUserInfo() {
        return {name: this._name.textContent, about: this._about.textContent, photo: this._photo}
    }
    setUserInfo(newName, newAbout, newPhoto) {
        this._name.textContent = newName;
        this._about.textContent = newAbout;
        if (newPhoto !== undefined) {
            this._photo.src = newPhoto;
        }
    }
}