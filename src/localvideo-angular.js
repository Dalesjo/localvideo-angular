"use strict";
angular.module('localvideoAngular',[])
.directive('localvideo', function() {
	return {
      restrict: 'A',
      scope: {
          localvideo: '='
			},
      link: function (scope, element, attrs) {
				/* empy element to validate upload video */
 				video = document.createElement("video"),

				element[0].onchange = function(change) {

					// according to http://demos.flowplayer.org/scripting/filereader.html
					// hls is always considered as audio/mpegurl locally
	        // so we cannot avoid a player error without excluding hls video
					var file = element[0].files[0],
			        canplay = !!video.canPlayType(file.type).replace("no", ""),
			        isaudio = file.type.indexOf("audio/") === 0 && file.type !== "audio/mpegurl";

					/* Valid videofile */
					if (canplay && !isaudio) {
						file.url = URL.createObjectURL(file);
						scope.localvideo(file);
					} else {
						console.log("Wrong filetype");
					}
				}
			}
	}
});
