// console.log('works')
import '/styles/list-my-space.css';

const allPages = document.querySelectorAll('div.page');
allPages[0].style.display = 'block';

function navigateToPage(event) {
  const pageId = location.hash ? location.hash : '#page1';
  for (let page of allPages) {
    if (pageId === '#' + page.id) {
      page.style.display = 'block';
    } else {
      page.style.display = 'none';
    }
  }
  return;
}
navigateToPage();

//init handler for hash navigation
window.addEventListener('hashchange', navigateToPage);


// Camera functionality
const captureButton = document.getElementById('capture-btn');
const previewImage = document.getElementById('picture-preview');
const video = document.getElementById('video');
previewImage.style.display = 'none';

// Check if the browser supports the camera API
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  // Set up the camera stream
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      // Attach the camera stream to the video element
      video.srcObject = stream;
      video.play();

      // Capture the picture when the button is clicked
      captureButton.addEventListener('click', () => {
        // Create a canvas element to capture the image
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert the canvas image to a data URL and display it in the preview element
        previewImage.src = canvas.toDataURL('image/png');
        console.log(previewImage.src);
        previewImage.style.display = 'block';
      });
    })
    .catch(error => {
      console.error('Error accessing camera:', error);
    });
} else {
  console.error('Camera not supported by this browser');
}