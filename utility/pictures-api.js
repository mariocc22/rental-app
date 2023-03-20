import "/styles/images-api.css";

import {
  app,
  auth,
  db,
  doc,
  addDoc,
  collection,
  setDoc,
  getDoc,
  getStorage,
  sRef,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
  ref,
} from "../modules/firebase.js";

// Initialize variables
let files = [];
let downloadURL;
const reader = new FileReader();
const namebox = document.getElementById("namebox");
const extlab = document.getElementById("extlab");
const myimg = document.getElementById("myimg");
const proglab = document.getElementById("upprogress");
const SelBtn = document.getElementById("selbtn");
const UpBtn = document.getElementById("upbtn");
const DownBtn = document.getElementById("downbtn");
let urlString = [];

function GetFileName(file) {
  let temp = file.name.split(".");
  let fname = temp.slice(0, -1).join(".");
  return fname;
}

// Create Input to handle multiple files =====================
let input = document.createElement("input");
input.type = "file";
input.setAttribute("name", "myFile[]");
input.setAttribute("multiple", "");

input.addEventListener("change", handleFiles);

function handleFiles() {
  files = [];
  files = [...this.files];
  const previewContainer = document.querySelector(".wrap-img-page12");
  previewContainer.innerHTML = "";
  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = function () {
      let imgContent = `<div class="img" data-set="${file.name}">
      <img class="select-img" src="${reader.result}" alt="image" />
      <span class="remove-img"><i class="fa-solid fa-xmark"></i></span>
    </div>`;
      let previewContent = `
    <img class="preview-img imgCar" src="${reader.result}" alt="image" />`;

      console.log("Image created: ", imgContent);

      document
        .querySelector(".image-container")
        .insertAdjacentHTML("afterbegin", imgContent);

      previewContainer.insertAdjacentHTML("afterbegin", previewContent);
    };

    reader.readAsDataURL(file);
  });
}

SelBtn.onclick = function () {
  input.click();
};

// Upload Process
const uploadAllFiles = async () => {
  let x = [];
  Promise.all([files.map((file) => UploadProcess(file))])
    .then((url) => {
      console.log("mylog==>", urlString);
      return urlString;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

async function UploadProcess(file) {
  return new Promise(function (_res, _rej) {
    let ImgToUpload = file;
    let ImgName = GetFileName(ImgToUpload);
    console.log("Image Name: ", ImgName);

    const metaData = {
      contentType: ImgToUpload.type,
    };
    const storage = getStorage();
    const storageRef = sRef(storage, `IMAGES/${ImgName}`);
    const uploadTask = uploadBytesResumable(storageRef, ImgToUpload, metaData);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        alert("error: image not uploaded! ");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((_downloadURL) => {
          // SaveURLtoFirestore(_downloadURL);
          console.log("Image uploaded successfully!");
          console.log(_downloadURL);
          urlString.push("" + _downloadURL);
          return urlString;
        });
      }
    );
  });
}

async function uploadFiles2(filesToUpload) {
  const storage = getStorage();
  const uploadPromises = filesToUpload.map(async (file) => {
    let ImgName = GetFileName(file);
    const fileId = ImgName;
    // const fileId = `${Date.now()}-${file.name}`;
    const fileRef = sRef(storage, `IMAGES/${fileId}`);
    const snapshot = await uploadBytes(fileRef, file);
    return snapshot;
  });

  try {
    const snapshots = await Promise.all(uploadPromises);
    const downloadUrls = [];
    for (let i = 0; i < snapshots.length; i++) {
      const snapshot = snapshots[i];
      const url = await getDownloadURL(snapshot.ref);
      console.log("This is the url: ", url);
      downloadUrls.push(url);
    }
    return downloadUrls;
  } catch (error) {
    console.error("Error uploading files:", error);
  }
}

// ////////////////// REFACTOR CODE FROM 128 TO 134
// const snapshots = await Promise.all(uploadPromises);
// const downloadUrls = await Promise.all(
//   snapshots.map(async (snapshot) => {
//     const url = await getDownloadURL(snapshot.ref);
//     console.log("This is the url: ", url);
//     return url;
//   })
// );
//////////////////////// PICTURE UPLOAD CAMERA
async function cameraUpload(img, name) {
  console.log(img);
  console.log(name);

  const metaData = {
    contentType: img.type,
  };
  const storage = getStorage();
  const storageRef = sRef(storage, `IMAGES/${name}`);
  const uploadTask = uploadBytesResumable(storageRef, img, metaData);

  uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => {
      console.log(error.message);
      alert("error: image not uploaded! ");
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((_downloadURL) => {
        // SaveURLtoFirestore(_downloadURL);
        console.log("Image uploaded successfully!");
        console.log(_downloadURL);
        urlString.push("" + _downloadURL);
      });
    }
  );
}
export {
  input,
  UploadProcess,
  urlString,
  cameraUpload,
  uploadAllFiles,
  files,
  uploadFiles2,
};
