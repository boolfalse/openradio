
require('dotenv').config();

const OpenRadio = require('openradio');
const radio = OpenRadio();
const http = require('http');
const got = require('got');
const helper = require('./helper');

http
    .createServer((req, res) => {
        res.setHeader("content-type", "audio/mp3");
        radio.pipe(res);
    })
    .listen(process.env.STREAM_PORT);

let firstTrackNumber = helper.randomFileName(1);
// emit event using firstTrackNumber
radio.play(got.stream(`${process.env.APP_HOST}/storage/tracks/channel-${process.env.CHANNEL_NUMBER}/${firstTrackNumber}.mp3`));

radio.on('end', () => {
    let nextTrackNumber = helper.randomFileName(1);
    // emit event using nextTrackNumber
    radio.play(got.stream(`${process.env.APP_HOST}/storage/tracks/channel-${process.env.CHANNEL_NUMBER}/${nextTrackNumber}.mp3`));
});
