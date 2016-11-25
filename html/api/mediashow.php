<?php

$videodir = "/media/hdd1/videos/*.mp4";
$audiodir = "/media/hdd1/musics/*.mp3";

http_response_code(200);
header('content-type: application/json; charset=utf-8');
echo json_encode(array(
		"audios"  => glob($audiodir),
		"videos" => glob($videodir)
));