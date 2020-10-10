import React from "react";

const emailRegex = RegExp(
	/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
);

const passwordRegex = RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z!@#$%^&*\d]{8,}$/);

const mobileRegex = RegExp(/^\d{10}$/);

const verifyEmail = (email) => {
	return emailRegex.test(email);
};

const verifyPassword = (password) => {
	return passwordRegex.test(password);
};

const verifyMobile = (mobile) => {
	return mobileRegex.test(mobile);
};

export default {
	verifyEmail,
	verifyMobile,
	verifyPassword,
};
