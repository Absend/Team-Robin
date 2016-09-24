import { Requester } from './requester.js';
import { createReqData } from './helpers/dataHelper.js';

let data = (function () {
    
    function register(user) {
        let promise = new Promise((resolve, reject) => {
            let url = 'api/users';
            let options = createReqData(user);

            Requester.post(url, options)
                .then(function (res) {
                    resolve(res);
                }, function (err) {
                    reject(err.responseText);
                });
        });

        return promise;
    }

    function login(user) {
        let promise = new Promise((resolve, reject) => {
            let url = 'api/users/auth';
            let options = createReqData(user);

            Requester.put(url, options)
                .then(function (res) {
                    resolve(res);
                }, function (err) {
                    reject(err);
                });
        });

        return promise;
    }

    

    return {
        users: {
            register,
            login
        }
    };
})();

export { data };