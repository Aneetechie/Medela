function getQueryParam(param) {
    const urlPrams = new URLSearchParams(window.location.search);
    return urlPrams.get(param)
}

const doctorName = getQueryParam('doctorName');

document.getElementById('doctorName').textContent = `Dr. ${doctorName}`