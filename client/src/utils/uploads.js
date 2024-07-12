import axios from 'axios';

const API_URL = "http://localhost:8000/api/v1/images/upload";

const cloudinaryUpload = (fileToUpload) => {
    const formData = new FormData();
    formData.append('image', fileToUpload); // 'images' phải khớp với tên trường bạn đã đặt trong upload.array()

    return axios.post(API_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(res => res.data)
    .catch(err => console.error(err));
};

export default cloudinaryUpload;
