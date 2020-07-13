import $ from 'jquery';
import './style.scss';

$('#main').html('Here we go!');

let d = 0;
setInterval(() => {
  d += 1;
  document.getElementById('main').innerHTML = `You've been on this page ${d} seconds`;
}, 1000);
