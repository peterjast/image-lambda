const AWS = require('aws-sdk');
const JSON = require('json');
const fs = require('fs');

const s3 = new AWS.S3();

exports.handler = async (event) => {
  
  console.log('Event:', event);
  
  const object = event.Records[0].s3;
  console.log(object);
  const bucket = object.bucket.name;
  const file = object.object;
  
  const params = {
    Bucket: bucket, 
    Key: 'images.json'
  };
  
  const uploadParams = {
    Body: file,
    contentType: 'json',
    Bucket: bucket,
    Key: 'images.json'
  };
  
  console.log(uploadParams.Body);
  
  const upload = async() => {
    return await new Promise((resolve, reject) => {
      s3.putObject(params, (err, results) => {
        if(err) reject(err);
        else resolve(results);
      });
    });
  };
  
  s3.getObject(params, (err, result) => {
    if (err) {
      console.error(err.message);
    } else {
      let arr = result.Body;
        arr.push(file);
        uploadParams.Body = arr;
    }
  });
    
  return upload();
};