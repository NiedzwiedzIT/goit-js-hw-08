import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
 

const videoCurrentTime = 'videoplayer-current-time';
 

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

console.log(player);

const currentTime = localStorage.getItem(videoCurrentTime);
console.log(currentTime);
 
if (currentTime)
  player.setCurrentTime(currentTime)
    .then(seconds => console.log(`The video set at the  ${seconds}-time.`))
    .catch(error => {
      switch (error.name) {
        case 'RangeError':
          console.log(
            'The time was less than 0 or greater than the video’s duration'
          );
          break;

        default:
          console.log(
            'Some error occurred... '
          );
          break;
      }
    });
 
const onPlay = function (data) { 
  localStorage.setItem(videoCurrentTime, data.seconds);
};

player.on('play', throttle(onPlay, 1000));

