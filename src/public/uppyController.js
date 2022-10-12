import { Uppy, Dashboard, AwsS3 } from 'https://releases.transloadit.com/uppy/v3.0.1/uppy.min.mjs';
const uppy = new Uppy()
    .use(Dashboard, {
        inline: true,
        width: 1250,
        height: 550,
        target: '#drag-drop-area',
        showLinkToFileUploadResult: true,
        trigger: '#pick-files',
        metaFields: (file) => {
            const fields = [{ id: 'name', name: 'File name' }];
            if (file.type.startsWith('image/')) {
                fields.push({ id: 'album_user', name: 'Album user' });
            }
            return fields;
        },
    })
    .use(AwsS3, {
        companionUrl: 'http://localhost:3020/companion',
        headers: { 'Access-Control-Allow-Origin': '*' },
        companionHeaders: { 'Access-Control-Allow-Origin': 'Access - Control - Allow - Origin' },
    });

uppy.on('upload-success', () => {
    uppy.info('File uploaded!');
})

    .on('error', (error) => {
        uppy.info('Upload error!');
        console.log(error.stack);
    })
    .on('upload-error', (file, error) => {
        console.log('error with file:', file.id);
        console.log('error message:', error);
    });

uppy.on('complete', (result) => {
    console.log(result.successful);
    const resultUpload = result.successful;
    let data = [];
    resultUpload.forEach((e) => {
        const id = e.id;
        const album_id = e.meta.key.split('/')[0];
        const user = e.meta.album_user || 'unknown';
        const photo_url = e.uploadURL;
        const date = new Date().toISOString();
        data.push({ id: id, album_id: album_id, user: user, photo_url: photo_url, date: date });
    });
    data = JSON.stringify(data);

    function setCookie(name, value, days) {
        var expires = '';
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (value || '') + expires + '; path=/';
    }

    setCookie('data', data, 10);
});
