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
    this._name = name;
    this._info = about;
    this._titleField.textContent = this._name;
    this._infoField.textContent = this._info;
  }

  setAvatar({ avatar }){
    this._avatarElement.src = avatar;
    this._avatarElement.alt = this._name
  }
  
  updateInfo() {
    this._profileName.value = this._name;
    this._profileInfo.value = this._info;
  }

  setUserId(id){
    this._id = id
  }
  getUserId() {
    return this._id
  }

  getUserInfo() {
    return {
      name: this._name,
      info: this._info,
    };
  }
}
