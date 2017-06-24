import { changeCurrentTime, toggleIsPlaying, playNextSong, playPrevSong } from './player-actions';
import store from '../store';
import { formatSeconds } from './utils/FormatUtils.js';

const audioPlayer = document.createElement('audio');
let currentTime = 0;
let duration = 0;

audioPlayer.ontimeupdate = function(e){
  const currentTime = Math.floor(e.target.currentTime);
  if (currentTime === player.currentTime) {
      return
  }
  store.dispatch(changeCurrentTime(currentTime));
}

audioPlayer.addEventListener("ended", function(e){
  console.log(e);
  console.log('Song Playback ended.');
});

const AudioPlayer = {
  play: (playlist=undefined, songIndex=undefined, song=undefined) => {
    if(song === undefined){
      audioPlayer.src = playlist[songIndex].file;
      audioPlayer.addEventListener('loadedmetadata', function() {
        duration = audioPlayer.duration;
        audioPlayer.currentTime = currentTime;
        audioPlayer.play();

        store.dispatch(toggleIsPlaying(true, playlist, songIndex, formatSeconds(duration)));
      });
    }else{
      audioPlayer.src = song.file;
      audioPlayer.addEventListener('loadedmetadata', function() {
        duration = audioPlayer.duration;
        audioPlayer.currentTime = currentTime;
        audioPlayer.play();

        store.dispatch(toggleIsPlaying(true, song, formatSeconds(duration)));
      });
    }
    
  },
  pause: (playlist, songIndex) => {
      duration = audioPlayer.duration;
      audioPlayer.pause();
      store.dispatch(toggleIsPlaying(false, playlist, songIndex, formatSeconds(duration)));
      currentTime = audioPlayer.currentTime;
  },
  next: (playlist, songIndex) => {
    currentTime = 0;
    AudioPlayer.play(playlist, songIndex);
    store.dispatch(playNextSong(playlist, songIndex));
  },
  previous: (playlist, songIndex) => {
    currentTime = 0;
    AudioPlayer.play(playlist, songIndex);
    store.dispatch(playPrevSong(playlist, songIndex));
  },
  playbackEnded: () => {
    
  }
  
}

Object.freeze(AudioPlayer);

export default AudioPlayer;