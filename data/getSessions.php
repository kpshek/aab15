<?php
include_once('simplehtmldom_1_5/simple_html_dom.php');
// Create DOM from URL
header('Content-Type: application/json');

$ids = [599,
       636,
       661,
       664,
       668,
       669,
       701,
       703,
       705,
       706,
       709,
       715,
       731,
       742,
       746,
       751,
       752,
       753,
       754,
       755,
       756,
       765,
       767,
       784,
       787,
       791,
       792,
       802,
       805,
       807,
       812,
       813,
       817,
       819,
       820,
       821,
       824,
       827,
       828,
       829,
       831,
       833,
       834,
       836,
       837,
       841,
       842,
       848,
       849,
       853,
       857,
       858,
       860,
       862,
       868];
  $url = 'http://confengine.com/agile-and-beyond-2015/proposal/';

  foreach($ids as $id) {
    $html = file_get_html($url.$id);
      $article = $html->find('article[class="is-post is-post-excerpt"]', 0);
      $title = trim($article->find('div.story-header', 0)->plaintext);
      $body = $article->find('div.story-body div p');
      $item['para'] = [];
      foreach($body as $p) {
          $item['para'][] = $p->plaintext;
      }

      $speaker = trim($article->find('a.post-image-large div', 0)->plaintext);
      $speaker_img_html = trim($article->find('a.post-image-large img', 0));
      //$img_url = $speaker_img_html->getAttribute('src');


      $item['id'] = $id;
      $item['speaker'] = $speaker;
      $item['speaker_img'] = $speaker_img_html;
      $item['title'] = $title;
      //$item['body']  = $body;
      $articles[] = $item;
  }


// Find all article blocks
echo json_encode($articles);



?>