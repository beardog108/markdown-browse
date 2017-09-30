
function adjustHeight(){
  var body = document.body;
  var html = document.documentElement;
  ht = Math.max(  html.clientHeight );
  $('#page').css('height', ht);
}

function sanitize(content){
  content = content.replace("'", '&#x27;');
  content = content.replace('>', '&#x3E;');
  content = content.replace('<', '&#x3C;');
  return content;
}

adjustHeight();

setInterval(adjustHeight, 1000);

theme = '<link rel="stylesheet" href="./min.css">';

var page1 = '<!DOCTYPE HTML><html><head>' + theme + '<meta charset="utf-8"><title>markdown content</title></head><body>';
var page2 = '<br><br><br><br></body></html>';
var content = '';

$('#page').on('load', function(){
  if ($('#page').attr('srcdoc') != 'loading...'){
  }
});

$('#forward').click(function(){
  $('#page').attr('srcdoc', window.next);
});
$('#back').click(function(){
  $('#page').attr('srcdoc', window.previous);
});

$('#go').click(function(){
  window.previous = $('#page').attr('srcdoc');
  target = $('#url').val().trim();
  if (target === ''){
    return;
  }
  $('#page').attr('srcdoc', 'loading...');
  $.ajax({
    method: "GET",
    url: target,
    timeout: 10000
  })
    .done(function(data) {
      content = page1 + markdown.toHTML(sanitize(data)) + page2;
      $('#page').attr('srcdoc', content);
      window.next = content;
    })
    .error(function(xhr, status, code){
      $('#page').attr('srcdoc', 'Error loading page: ' + status)
    });
});

var about = '<h1>Markdown Browse</h1><p>A simple Markdown viewer</p><h2>Why?</h2><p>The web is cluttered. Ads, tracking, annoying popups.</p><p><a target="_BLANK" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Gopher_(protocol)">Gopher</a> had some things right: no scripts by default, consistent interface, "content first" priority.</p><p>Markdown-Browse is a simple way to relive those days while maintaining speed, security, and privacy.</p><p>While not a replacement for HTML, it is a decent way to publish simple fast pages on the web.';

$('#page').attr('srcdoc', page1 + about + page2);
window.previous =$('#page').attr('srcdoc');
