'use strict';

//Define NantesJug Module
var njFunction = function () {
  var events = njEvents;
  var speakers = njSpeakers;

  var that = {
    getToday: function () {
      var d = new Date();
      d.setHours(0);
      d.setMinutes(0);
      d.setSeconds(0);
      return d;
    },
    getEvents: function () {
      return events;
    },
    getNextEvent: function () {
      var nextEvents = that.getNextEvents();
      if (nextEvents.length === 0) {
        return null;
      } else {
        return nextEvents[0];
      }
      return nextEvents;
    },
    getNextEvents: function () {
      var nextEvents = [];
      var today = that.getToday();
      for (var i = 0; i < events.length; i++) {
        if (events[i].date > today) {
          nextEvents.push(events[i]);
        }
      }
      return nextEvents;
    },
    getPreviousEvents: function () {
      var nextEvents = [];
      var today = that.getToday();
      for (var i = 0; i < events.length; i++) {
        if (events[i].date <= today) {
          nextEvents.push(events[i]);
        }
      }
      return nextEvents;
    },
    getEvent: function (eventId) {
      for (var i = 0; i < events.length; i++) {
        if (events[i].id === eventId) {
          return events[i];
        }
      }
      return null;
    },
    getSpeakers: function () {
      return speakers;
    },
    getSpeaker: function (speakerId) {
      for (var speaker in speakers) {
        if (speakers.hasOwnProperty(speaker)) {
          if (speakers[speaker].id === speakerId) {
            return speakers[speaker];
          }
        }
      }
      return null;
    }
  };
  return that;
};
var nj = njFunction();

angular.module('nantesjugApp')
    .controller('MenuCtrl', function ($scope, $location) {
      $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
      };
    })
    .controller('MainCtrl', function ($scope) {
      $scope.event = nj.getNextEvent();
      $scope.today = nj.getToday();

      var eventDetailledView = {};
      if ($scope.event !== null) {
        eventDetailledView[$scope.event.id] = true;
      }
      $scope.eventDetailledView = eventDetailledView;
      $scope.eventToggleViewDisabled = true;
    })
    .controller('EventsCtrl', function ($scope) {
      $scope.today = nj.getToday();
      $scope.nextEvents = nj.getNextEvents();
      $scope.previousEvents = nj.getPreviousEvents();

      //Events detailled view
      var eventDetailledView = {};
      $scope.nextEvents.forEach(function (event) {
        eventDetailledView[event.id] = false;
      });
      $scope.previousEvents.forEach(function (event) {
        eventDetailledView[event.id] = false;
      });
      $scope.eventDetailledView = eventDetailledView;
      $scope.eventToggleViewDisabled = false;

      $scope.toggleDetail = function (evendId) {
        $scope.eventDetailledView[evendId] = !$scope.eventDetailledView[evendId];
      };
    })
    .controller('EventCtrl', function ($scope, $routeParams) {
      var eventId = parseInt($routeParams.eventId, 10);
      $scope.event = nj.getEvent(eventId);
      $scope.today = nj.getToday();

      var eventDetailledView = {};
      eventDetailledView[$scope.event.id] = true;
      $scope.eventDetailledView = eventDetailledView;
      $scope.eventToggleViewDisabled = false;

      $scope.toggleDetail = function (evendId) {
        $scope.eventDetailledView[evendId] = !$scope.eventDetailledView[evendId];
      };

    })
    .controller('SpeakersCtrl', function ($scope) {
      $scope.speakers = nj.getSpeakers();
    })
    .controller('SpeakerCtrl', function ($scope, $routeParams) {
      var speaker = nj.getSpeaker($routeParams.speakerId);
      $scope.speaker = speaker;
    })
;
