//Version 1.2

console.log("Initiating Bugs Chrome Plugin.");

var scriptToRun = function(){
	bugs.music.listen = function(trackId, playForce, param){
		if(trackId instanceof Object){
			var indexer;
			var tracks = '';
			for(indexer=0; indexer<trackId.length; indexer++){
				tracks = tracks + trackId[indexer].defaultValue;
				if(indexer + 1 != trackId.length){
					tracks = tracks + ',';
				}
			}
			location.href = 'bugsmenubar://playSongWithTrackID@' + tracks + '@@forcePlay@' + playForce;
		} else { 
			location.href = 'bugsmenubar://playSongWithTrackID@' + trackId + '@@forcePlay@' + playForce;
		}
		if(!playForce){
			alert('재생목록에 곡이 추가되었습니다.');
		}
	}
};

var scriptMadeUp = '(' + scriptToRun + ')();';
var scriptObject = document.createElement("script");

scriptObject.textContent = scriptMadeUp;

document.body.appendChild(scriptObject);
document.body.removeChild(scriptObject);