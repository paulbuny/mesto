export default class UserInfo {
    constructor({nameSelector, jobSelector, avatarImage}) {
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(jobSelector);
        this._avatar = document.querySelector(avatarImage);
    }

    getUserInfo () {
        const userInfo = {
            name: this._name.textContent,
            about: this._about.textContent,
            avatar: this._avatar.src,
            _id: this._id,
        }
        return userInfo;
    }

    setUserInfo (data) {
        this._name.textContent = data.name;
        this._about.textContent = data.about;
        this._id = data.id;
        this._avatar.src = data.avatar;
    }
}