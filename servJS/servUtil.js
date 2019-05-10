'use strict';

function stringCheck(str){
	
	if(!typeof str == 'string'){
		return;
	}
	
	let str = str.trim();
	return str;
}

function escapeHtml(text) {
  return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}

module.exports = {};