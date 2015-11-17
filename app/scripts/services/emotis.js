'use strict';

/**
 * @ngdoc service
 * @name blogApp.emotis
 * @description
 * # emotis
 * Service in the blogApp.
 */
angular.module('blogApp')
  .factory('Emotis', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var emotis = [
    	{content:':smile:'},
    	{content:':laughing:'},
    	{content:':blush:'},
    	{content:':smiley:'},
    	{content:':relaxed:'},
    	{content:':smirk:'},
    	{content:':heart_eyes:'},
    	{content:':kissing_heart:'},
    	{content:':kissing_closed_eyes:'},
    	{content:':flushed:'},
    	{content:':relieved:'},
    	{content:':grin:'},
    	{content:':wink:'},
    	{content:':stuck_out_tongue_winking_eye:'},
    	{content:':sleeping:'},
    	{content:':worried:'},
    	{content:':frowning:'},
    	{content:':open_mouth:'},
    	{content:':confused:'},
    	{content:':unamused:'},
    	{content:':sweat_smile:'},
    	{content:':sweat:'},
    	{content:':disappointed_relieved:'},
    	{content:':pensive:'},
    	{content:':cold_sweat:'},
    	{content:':cry:'},
    	{content:':sob:'},
    	{content:':joy:'},
    	{content:':scream:'},
    	{content:':rage:'},
    	{content:':neckbeard:'},
    	{content:':triumph:'},
    	{content:':yum:'},
    	{content:':sunglasses:'},
    	{content:':smiling_imp:'},
    	{content:':innocent:'},
    	{content:':heart:'},
    	{content:':broken_heart:'},
    	{content:':shit:'},
    	{content:':+1:'},
    	{content:':-1:'},
    	{content:':v:'},
    	{content:':raised_hands:'},
    	{content:':clap:'},
    	{content:':metal:'},
    	{content:':fu:'},
    	{content:':dancers:'},
    	{content:':couplekiss:'},
    	{content:':japanese_ogre:'},
    	{content:':japanese_goblin:'},
    	{content:':see_no_evil:'},
    	{content:':hear_no_evil:'},
    	{content:':speak_no_evil:'},
    	{content:':skull:'},
    	{content:':kiss:'},
    	{content:':ear:'},
    	{content:':eyes:'},
    	{content:':speech_balloon:'},
    	{content:':thought_balloon:'},
    	{content:':love_letter:'},
    	{content:':trollface:'},
    	{content:':boom:'},
    	{content:':rose:'},
    	{content:':four_leaf_clover:'},
    	{content:':gift_heart:'},
    	{content:':jack_o_lantern:'},
    	{content:':ghost:'},
    	{content:':santa:'},
    	{content:':christmas_tree:'},
    	{content:':gift:'},
    	{content:':tada:'},
    	{content:':phone:'},
    	{content:':mushroom:'},
    	{content:':computer:'},
    	{content:':crystal_ball:'},
    	{content:':cd:'},
    	{content:':tv:'},
    	{content:':vhs:'},
    	{content:':alarm_clock:'},
    	{content:':watch:'},
    	{content:':radio:'},
    	{content:':bath:'},
    	{content:':mailbox:'},
    	{content:':toilet:'},
    	{content:':hammer:'},
    	{content:':moneybag:'},
    	{content:':credit_card:'},
    	{content:':money_with_wings:'},
    	{content:':postal_horn:'},
    	{content:':tophat:'},
    	{content:':smoking:'},
    	{content:':pill:'},
    	{content:':syringe:'},
    	{content:':scissors:'},
    	{content:':soccer:'},
    	{content:':basketball:'},
    	{content:':snowboarder:'},
    	{content:':swimmer:'},
    	{content:':surfer:'},
    	{content:':trophy:'},
    	{content:':space_invader:'},
    	{content:':dart:'},
    	{content:':video_game:'},
    	{content:':microphone:'},
    	{content:':headphones:'},
    	{content:':lipstick:'},
    	{content:':necktie:'},
    	{content:':bikini:'},
    	{content:':mega:'},
    	{content:':hourglass:'},
    	{content:':mag:'},
    	{content:':date:'},
    	{content:':art:'},
    	{content:':crown:'},
    	{content:':banana:'},
    	{content:':beers:'},
    	{content:':coffee:'},
    	{content:':wine_glass:'},
    	{content:':birthday:'},
    	{content:':atm:'}

    ];

    var Emotis = {
      all: emotis,
      get:function(){
      	return emotis;
      },
      getFaces:function(){
      	return emotis;
      }
  	}

  	return Emotis;
  });