export default class UserInfo {
  constructor({ nameElement, infoElement }) {
    (this._profileName = nameElement),
      (this._profileInfo = infoElement),
      (this._name = ""),
      (this._info = "");
  }

  updateUserInfo() {
    this._profileName.value = this._name;
    this._profileInfo.value = this._info;
  }

  setUserInfo(newName, newInfo) {
    this._name = newName;
    this._info = newInfo;
  }

  getUserInfo() {
    return {
      name: this._name,
      info: this._info,
    };
  }
}
