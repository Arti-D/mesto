export default class UserInfo {
  constructor({
    nameElement,
    infoElement,
    titleField,
    infoField,
    avatarElement,
  }) {
    (this._profileName = nameElement), (this._profileInfo = infoElement);
    (this._titleField = titleField), (this._infoField = infoField);
    this._avatarElement = avatarElement;
  }

  setUserInfo({ name, about }) {
    if (name) {
      this._name = name;
      this._titleField.textContent = this._name;
    }
    if (about) {
      this._info = about;
      this._infoField.textContent = this._info;
    }
  }

  setAvatar({ avatar }) {
    if (avatar) {
      this._avatarElement.src = avatar;
      this._avatarElement.alt = this._name;
    }
  }

  updateInfo() {
    this._profileName.value = this._name;
    this._profileInfo.value = this._info;
  }

  setUserId(id) {
    if(id) {
      this._id = id;
    }
  }
  getUserId() {
    return this._id;
  }

  getUserInfo() {
    return {
      name: this._name,
      info: this._info,
    };
  }
}
