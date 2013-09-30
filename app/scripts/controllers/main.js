'use strict';

//Define NantesJug Module
var nj = function () {
  var events = njEvents;
  var speakers = njSpeakers;

  return {
    getEvents: function(){
      return events;
    },
    getEvent: function (eventId) {
      for (var i = 0; i < events.length; i++) {
        if (events[i].id === eventId) {
          return events[i];
        }
      }
      return null;
    },
    getSpeakers: function(){
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
  }
}();


angular.module('nantesjugApp')
    .controller('MenuCtrl', function ($scope, $location) {
      $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
      };
    })
    .controller('MainCtrl', function ($scope) {
      var event = nj.getEvent(1);
      $scope.event = event;

      var eventDetailledView = {};
      eventDetailledView[event.id] = true;
      $scope.eventDetailledView = eventDetailledView;

      $scope.toggleDetail = function (evendId) {
        $scope.eventDetailledView[evendId] = !$scope.eventDetailledView[evendId];
      };

    })
    .controller('EventsCtrl', function ($scope) {
      $scope.events = nj.getEvents();

      //Events detailled view
      var eventDetailledView = {};
      events.forEach(function (event) {
        eventDetailledView[event.id] = false;
      });
      $scope.eventDetailledView = eventDetailledView;

      $scope.toggleDetail = function (evendId) {
        $scope.eventDetailledView[evendId] = !$scope.eventDetailledView[evendId];
      };
    })
    .controller('EventCtrl', function ($scope, $routeParams) {
      var eventId = parseInt($routeParams.eventId, 10);
      var event = nj.getEvent(eventId);
      $scope.event = event;

      var eventDetailledView = {};
      eventDetailledView[event.id] = true;
      $scope.eventDetailledView = eventDetailledView;

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
