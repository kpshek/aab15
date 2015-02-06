'use script';

angular.module('aabApp')
    .factory('sessionData',  function sessionData($http,_,$q) {

        return {
            getSession: function($id) {
               return $http.get('data/sessions.json');
            }
        }
    });