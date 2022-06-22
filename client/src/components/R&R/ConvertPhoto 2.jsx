  import axios from 'axios';

  // helper
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
        if ((encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      };
      reader.onerror = error => reject(error);
    });
  }

  const photoUrlsToArray = (files, setPhotos) => {
    let allPhotos = [];
    for (var i = 0; i < files.length; i++) {
      let base64 = getBase64(files[i]);
      allPhotos.push(base64);
    }

    Promise.all(allPhotos)
    .then((allBase64) => {
      let allUrl = [];
      allBase64.forEach((base64) => {
        let body = new FormData();
        body.append('image', base64);
        allUrl.push(axios.post(`https://api.imgbb.com/1/upload?key=193e1e2ee600f99c92cf7b198b721403`, body));
      });
      Promise.all(allUrl)
      .then((result) => {
        let urls = result.map((each) => each.data.data.display_url);
        setPhotos(urls);
      })
    })
  }

  export default photoUrlsToArray;