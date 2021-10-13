

function chooseImg() {
   alert("in choose img");
   const fileInput = getElementById('file_input_btn');
	fileInput.addEventListener('change', (e) => getFile(e.target.files));
	    const target = getElementById('target');			target.addEventListener('paste', (e) => {
				e.preventDefault();
				getFile(e.clipboardData.files);
			});
}

const output = document.getElementById('img_input');
function getFile(fileList) {
	let file = null;
	for (let i = 0; i < fileList.length; i++) {
		if (fileList[i].type.match(/^image\//)) {
			file = fileList[i];
			break;
		}
	}
	if (file !== null) {
		output.src = URL.createObjectURL(file);
	}
}
 
 


