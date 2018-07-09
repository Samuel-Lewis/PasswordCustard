let last_raw = '';

// Pulls password from /raw API
$(document).ready(function () {
	setupForm();

	// GET data from /raw to show
	$('#generate-password').on('click', getRawPassword);
	$('#generate-password').click();

	// Copy on click
	$('#copy-password').on('click', copyToClipboard);

	// Enable tooltips
	$('[data-toggle="tooltip"]').tooltip();
});

function setupForm() {
	createSlider('words', 2, 3, 8);
	createSlider('numbers', 1, 1, 3);

	$('.slider').each(function(i, obj){
		obj.noUiSlider.on('update', function(){getFormat()});
	});
}

function createSlider(id, startMin, startMax, max) {
	var slider = document.getElementById(id);
	noUiSlider.create(slider, {
		start: [startMin, startMax],
		connect: true,
		tooltips: [true, true],
		format: wNumb({
			decimals: 0,
			thousand: '',
			suffix: '',
		}),
		step: 1,
		animate: true,
		range: {
			'min': 0,
			'max': max
		},
	});
	
}

// Reads form elements and generates formatting code
function getFormat() {
	var cust = document.getElementById('custom');
	var f = '';

	if (cust.value != '') {
		f = cust.value;
	} else {
		$('.slider').each(function (i, obj) {
			var vals = obj.noUiSlider.get();
			if (vals[0] != '0' || vals[1] != '0') {
				f += obj.id + ':' + vals[0] + ':' + vals[1] + ','
			}
		});
		f = f.slice(0, -1);
	}
	
	document.getElementById('format').innerHTML = f;
	return f;
}

function getRawPassword() {
	$('#copy-password').attr('data-original-title', 'Copy');

	var f = getFormat();
	if (f != '') {
		f = '?q=' + f;
	}

	$.ajax({
		url: '/raw' + f,
		method: 'GET',
		success: function (data) {
			pass = $('<div/>').text(data).html();
			// Send to heading
			$('#password-field').html(pass);

			last_raw = data;
			logPass(pass);
		},
	});
}

function copyToClipboard() {
	// Update tooltip
	$('#copy-password').attr('data-original-title', 'Copied!')
		.tooltip('show');

	// Create temp textarea, put text in it, copy from that
	var textArea = document.createElement('textarea');
	textArea.value = last_raw;
	document.body.appendChild(textArea);

	textArea.select();
	try {
		document.execCommand('copy');
	} catch (err) {
		alert('Browser does not support copy and paste automation :(');
	}
	document.body.removeChild(textArea);
}

// Pastes last 10 passwords to history box
const history = [];

function logPass(pass) {
	$('#history').html(history.join('</br>'));

	history.unshift(pass);

	if (history.length > 10) {
		history.pop();
	}
}