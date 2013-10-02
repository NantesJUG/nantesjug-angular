'use strict';

//Define NantesJug Module
var njFunction = function () {
  var events = njEvents;
  var speakers = njSpeakers;
  var places = njPlaces;

  // Public functions

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
      return _.first(that.getNextEvents());
    },
    getNextEvents: function () {
      var today = that.getToday();
      return _.filter(events, function(event){ return event.date > today; });
    },
    getPreviousEvents: function () {
      var today = that.getToday();
      return _.filter(events, function(event){ return event.date <= today; });
    },
    getEvent: function (eventId) {
      return _.find(events, function(event){ return event.id === eventId; });
    },
    getSpeakers: function () {
      return speakers;
    },
    getSpeaker: function (speakerId) {
      return _.find(speakers, function(speaker){ return speaker.id === speakerId; });
    },
    getPlace: function (placeId) {
      return _.find(places, function(place){ return place.id === placeId; });
    }
  };

  // Private functions

  //Fulfill events by replace id by full object (places, speakers)

  var fulfillEvent = function (event) {
    //Replace place id by place object
    event.place = that.getPlace(event.place);
    //Complete Subject
    _.each(event.subjects, function(subject){ fulfillSubject(subject); });
  };

  var fulfillSubject = function (subject) {
    //Replace speaker id by speaker object
    subject.speakers = _.map(subject.speakers, function(speakerId){ return that.getSpeaker(speakerId) });
  };

  //Fulfill each events
  _.each(events, function(event){ fulfillEvent(event) });

  //Returns publics methods
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
      $scope.searchText = '';
    })
    .controller('SpeakerCtrl', function ($scope, $routeParams) {
      var speaker = nj.getSpeaker($routeParams.speakerId);
      $scope.speaker = speaker;
    })
;
