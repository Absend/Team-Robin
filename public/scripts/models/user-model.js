import { requester } from '../helpers/requester.js';
import * as CryptoJS from '../../bower_components/crypto-js/crypto-js.js';

const STORAGE_AUTH_KEY = 'STORAGE_AUTHENTICATION_KEY';

function createRequestOptions(user) {
    let options = {
        data: {
            username: user.username,
            passHash: CryptoJS.SHA1($(user.password).val()).toString()
        }
    };

    return options;
}

class UserModel {
    register(user) {
        let promise = new Promise((resolve, reject) => {
            let url = 'api/users';
            let options = createRequestOptions(user);

            requester.post(url, options)
                .then(function (res) {
                    resolve(res);
                }, function (err) {
                    reject(err.responseText);
                });
        });

        return promise;
    }

    login(user) {
        let promise = new Promise((resolve, reject) => {
            let url = 'api/users/auth';
            let options = createRequestOptions(user);

            requester.put(url, options)
                .then(function (res) {
                    localStorage.setItem(STORAGE_AUTH_KEY, res.authKey);
                    resolve(res);
                }, function (err) {
                    reject(err);
                });
        });

        return promise;
    }

    logout() {
        let promise = new Promise((resolve, reject) => {
                localStorage.removeItem(STORAGE_AUTH_KEY);
                resolve();
        });

        return promise;
    }
}

let userModel = new UserModel();
export { userModel };