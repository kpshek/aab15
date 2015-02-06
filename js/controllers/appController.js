'use strict';

var aabApp = angular.module('aabApp', ["pageslide-directive"]);

aabApp.controller('appController', function($scope,sessionData,$sce) {
    $scope.checked;

    $scope.open = function(id) {
        console.log('session Id:',id);
        $scope.checked = true;

        sessionData.getSession(id)
            .then(
            function(s) {

                var session = _.findWhere(s.data, {id: id});

                if(typeof session !== 'undefined') {
                    var nPara = [];
                    angular.forEach(session.para, function(p) {

                        nPara.push($sce.trustAsHtml(p));
                    });
                    session.para = nPara;

                   $scope.selectedSession = session;
                }
            },
            function(e) {
                console.log('error', e);
            }
        )
    }

    $scope.closePanel = function() {
        $scope.checked = false;
    }

});


angular.module('aabApp')
    .filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);