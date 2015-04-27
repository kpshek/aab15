

var schedule = angular
    .module('aabSchedule',['ngRoute','mobile-angular-ui','ngSanitize'])
    .config(function($routeProvider) {
        $routeProvider.when('/',              {
            templateUrl: 'views/home.html',
            reloadOnSearch: false});

        $routeProvider.when('/day/:id',              {
            templateUrl: 'views/day.html',
            controller: 'dayController',
            reloadOnSearch: false});

        $routeProvider.when('/session/:id/:sessionId',              {
            templateUrl: 'views/session.html',
            controller: 'sessionController',
            reloadOnSearch: false});
    });

schedule.controller('sessionController', function($scope, $routeParams,$filter,_, $rootScope) {
    $scope.daySessions = [];
    $rootScope.backActive = true;
    var day = $routeParams.id;
    var sessionId = $routeParams.sessionId;

    var stuff = _.find($scope.$parent.schedule, function(item) {
        return parseInt(item.date) == parseInt(day);
    });

    var session = _.find(stuff.sessions, function(item) {
        return parseInt(item.id) == parseInt(sessionId);
    });

    if(typeof session !== 'undefined') {
        $scope.sessionData = session;
        console.log(session)
    }
});

schedule.controller('dayController', function($scope, $routeParams,$filter,_, $rootScope) {
    $scope.daySessions = [];
    $rootScope.backActive = true;
    var sessions = _.find($scope.$parent.schedule, function(item) {
        return parseInt(item.date) == parseInt($routeParams.id);
    });

    if(typeof sessions !== 'undefined') {
        $scope.daySessions = sessions;

    }
});

schedule.controller('scheduleController', function($scope, $http,$q,_,$filter, $rootScope) {
    $scope.title = 'Jason';
    $scope.schedule = [];
    $rootScope.backActive = false;
    $scope.back = function() {
        $rootScope.backActive = false;
        window.history.back();
    };

    function getSessionData() {
        var defer = $q.defer();

        $http.get('../data/sessions.json')
            .then(function(s){
                defer.resolve(s.data);
            },
        function(e) {
            defer.reject(e);
        });

        return defer.promise;
    }

    function buildSchedule(schedule) {
        var defer = $q.defer();
       var groupBy = _.groupBy(schedule, 'startTime');
        //var test = angular.copy(schedule);
        var dateFilter = $filter('date');
        var days = [];
        var days2 = [];
        var dateOfSessions = '';

        angular.forEach(schedule, function(session){

            dateOfSessions = dateFilter(session.startTime*1000,'MMMM d, yyyy');

            if(days.indexOf(dateOfSessions) === -1) {
                days.push(dateOfSessions);
                var ses = {
                    date: session.startTime*1000,
                    sessions: [session]
                };

                days2.push(ses);

            } else {
                days2[days.indexOf(dateOfSessions)].sessions.push(session);
            }
        });

        defer.resolve(days2);

        return defer.promise;
    }

    function setData(sessions) {
        angular.forEach(sessions, function(session) {
            var group = _.groupBy(session.sessions, 'startTime');
            session.grouped = group;
        });

        $scope.schedule = sessions;
    }



    $scope.init = function() {
        getSessionData()
            .then(buildSchedule)
            .then(setData);
    };

    $scope.init();
});