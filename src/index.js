import $ from 'jquery';
import './style.scss';

$('#main').html('Here we go!');

function myTimer() {
  const d = new Date();
  document.getElementById('main').innerHTML = `You've been on this page ${d.getSeconds()} seconds`;
}

setInterval(myTimer(), 1000);
