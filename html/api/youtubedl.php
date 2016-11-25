<?php 

$command = "/usr/local/bin/youtube-dl";
$destdir = "/media/hdd1/";

$execCmd = $command . " ";

$vid = $_GET["vid"];
$mode = $_GET["type"];

if(empty($vid)) {
	http_response_code(400);
	header('content-type: application/json; charset=utf-8');
	echo json_encode(array(
			"code" => -1,
			"output" => "invalid parameter"
	));
	exit;
}

if($mode === "audio") {
	$execCmd .= "--extract-audio --audio-format mp3 ";
	$destdir .= "musics/";
} else {
	$execCmd .= "--format mp4 ";
	$destdir .= "videos/";
}

$execCmd .= "--output \"" . $destdir . "%(title)s.%(ext)s" . "\" ";
$execCmd .= $vid;

$retCode = 0;
$retStr = array();

exec($execCmd, $retStr, $retCode);

http_response_code(200);
header('content-type: application/json; charset=utf-8');
echo json_encode(array(
		"cmd"  => $execCmd,
		"code" => $retCode,
		"output" => implode("\r\n", $retStr)
));

?>