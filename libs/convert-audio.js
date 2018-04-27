const fs = require('fs'),
    mime = require('mime'),
    crypto = require('crypto'),
    ffmpeg = require('fluent-ffmpeg');

const output = '../audio/' + crypto.randomBytes(20).toString('hex') + '.flac';

module.exports = file => new Promise((resolve, reject) => {
    if (!fs.existsSync(file)) {
        throw new Error('Input file must exist.');
    }
    if (mime.getType(file).indexOf('audio') > -1) {
        try {
            ffmpeg(file)
                .audioFrequency(16000)
                .audioChannels(1)
                .audioBitrate(320)
                .toFormat('flac')
                .save(output)
                .on('end', () => {
                    console.log('Completed audio conversion ...');
                    resolve(output)
                });
        } catch (err) {
            console.log(err);
            reject('Unable to Convert File');
        }
    } else {
        reject('Not an audio file'); 
    }
});