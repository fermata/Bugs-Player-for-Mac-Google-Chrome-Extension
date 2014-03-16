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
	bugs.music.trackList.prototype.listenAll = function (btn) {
		var listenForce = arguments[1];if(listenForce==null)listenForce=true;
		var recommendList = $("li.listRow div.recommend");
		var aList = $("input:hidden[name=_isStream]:not(:disabled)", this.box);

		if(aList.length == 0) {
			bugs.ui.showAlert("재생 가능한 곡이 없습니다.", {css : "layerLoginMsg"});
			return;
		}

		$("#_checkAll"+this.name).attr("checked",true).parent().parent().addClass("click");
		$(this.trackChecked).each(function() {
			var _this  = this;
			aList.each(function() {
				if(this.value == _this.val()) _this.checked();
			});
		});

		//this.cbox.checked();
		var chks = $("ul li input:hidden[name=_isStream]", this.box).not("input:disabled");

		if(typeof arguments[2] != "undefined" && arguments[2] == "no"){
			//추천곡 전체 재생 제외
			if(recommendList.length > 0){
				var recommend = $("li.listRow");
				var recommend_chk = $("li.listRow div.check");

				for(var i=0;i < recommendList.length;i++){
					recommend.eq(i).removeClass("rowSelect");
					recommend_chk.eq(i).removeClass("click");
				}

				chks = chks.splice(recommendList.length , chks.length);
			}
		}
		if(typeof chks == "undefined") return;
		if(typeof chks == "string") {
		} else if(typeof chks == "object") {
			var trackIdStr = "";
			if(chks.length == 0) {
				bugs.ui.showAlert("음악을 선택하여 주십시오.", {css : "layerAdultNotice"});
				return;
			}
			for(var i=0;i < chks.length;i++) {
				trackIdStr += $(chks[i]).val();
				if(i < chks.length - 1) trackIdStr +=",";
			}
			chks = trackIdStr;
		}

		if(!bugs.music.flashInstalled) {
			bugs.music.flashPopup.show();
			return;
		}

		bugs.music.listen(chks, listenForce);
	} 
};

var scriptMadeUp = '(' + scriptToRun + ')();';
var scriptObject = document.createElement("script");

scriptObject.textContent = scriptMadeUp;

document.body.appendChild(scriptObject);
document.body.removeChild(scriptObject);