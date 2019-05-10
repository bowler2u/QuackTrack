'use strict';

function dataCheck(data){
	if(typeof data == 'string' || typeof data == 'number'){
		return true;
	}else{
		return false;
	}
};

function cleanData(data) {
	return data.replace(/[^a-zA-Z0-9]/g, "");
};

module.exports = {dataCheck: dataCheck, cleanData: cleanData};