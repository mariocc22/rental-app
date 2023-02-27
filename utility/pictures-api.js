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
} from "../modules/firebase.js";

// Initialize variables
let files = [];
const reader = new FileReader();
const namebox = document.getElementById("namebox");
const extlab = document.getElementById("extlab");
const myimg = document.getElementById("myimg");
const proglab = document.getElementById("upprogress");
const SelBtn = document.getElementById("selbtn");
const UpBtn = document.getElementById("upbtn");
const DownBtn = document.getElementById("downbtn");
let urlString = "";

let input = document.createElement("input");
input.type = "file";

input.onchange = (e) => {
  files = e.target.files;
  let extention = GetFileExt(files[0]);
  let name = GetFileName(files[0]);

  namebox.value = name;
  extlab.innerHTML = extention;

  reader.readAsDataURL(files[0]);
};

reader.onload = function () {
  myimg.src = reader.result;
};

SelBtn.onclick = function () {
  input.click();
};

function GetFileName(file) {
  let temp = file.name.split(".");
  let fname = temp.slice(0, -1).join(".");
  return fname;
}

function GetFileExt(file) {
  let temp = file.name.split(".");
  let ext = temp.slice(temp.length - 1, temp.length);
  return "." + ext[0];
}

// Upload Process

async function UploadProcess() {
  let ImgToUpload = files[0];
  let ImgName = namebox.value + extlab.innerHTML;
  console.log(ImgName);

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
      console.log(error.message);
      alert("error: image not uploaded! ");
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((_downloadURL) => {
        // SaveURLtoFirestore(_downloadURL);
        console.log("Image uploaded successfully!");
        console.log(_downloadURL);
        urlString = "" + _downloadURL;
      });
    }
  );
}

// ... Post to DB //
// async function SaveURLtoFirestore(url) {
//   // Here we can add the property ID, retrieving it from another module
//   let name = namebox.value;
//   // let ext = extlab.innerHTML;
//   // let ref = doc(db, "IMAGES");

//   await addDoc(collection(db, "IMAGES"), {
//     propertyid: "property ID",
//     imageurl: url,
//   });
// }

// ... Get from DB //
// async function GetImagefromFirestore() {
//   let name = namebox.value;
//   let ref = doc(db, "ImageLinks/" + name);

//   const docSnap = await getDoc(ref);
//   // myimg.src = docSnap.data().ImageURL;
//   if (docSnap.exists()) {
//     myimg.src = docSnap.data().imageurl;
//   }
// }

// UpBtn.onclick = UploadProcess;
// DownBtn.onclick = GetImagefromFirestore;

// export { input, UploadProcess, GetImagefromFirestore, downloadURL};
export { input, UploadProcess, urlString };
