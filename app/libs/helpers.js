exports.downloadfile =function main(
    bucketName = 'flos-app',
    srcFilename = 'Version.txt',
    destFilename = null,
    res
) {
    const Cloud = require('@google-cloud/storage')
    const path = require('path');
    const cwd = path.join(__dirname, '..');
    const serviceKey = path.join(__dirname, './keys.json')

    const { Storage } = Cloud
    const storage = new Storage({
        keyFilename: serviceKey,
        projectId: 'your project id',
    })
    async function downloadFile() {
        if (destFilename === null){
            var dstFilename = path.join(cwd, 'Version.txt')
        }else{
            var dstFilename = path.join(destFilename)
        }
        const options = {
            destination: dstFilename,
        };
        await storage.bucket(bucketName).file(srcFilename).download(options);

        console.log(
            `gs://${bucketName}/${srcFilename} downloaded to ${dstFilename}.`
        );
    }
    res.json({
        error: false,
        message: 'Task successfully downloaded'
    });
    downloadFile().catch(console.error);
}