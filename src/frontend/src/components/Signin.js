import React from "react";
import "../assets/css/signup.css";
import "../assets/css/signin.css";
import validate from "./Validation";
import loginImg from "../assets/img/Login-bro.svg";

const validateForm = (state) => {
	if (state.isEmail === 0) {
		console.log("email or mobile incorrect");
		return false;
	} else if (state.isEmail === 1) {
		console.log("---submitting email---");
		return true;
	} else if (state.isEmail === 2) {
		console.log("---submitting mobile---");
		return true;
	}
};

class Signin extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			emailOrMobile: null,
			isEmail: 3, //0: error, 1: email, 2: mobile, 3: untouched
			password: null,
		};
	}

	handleSubmit = (event) => {
		event.preventDefault();
		// console.log("no reload again");
		if (validateForm(this.state)) {
			console.log("---submitting---");
		} else {
			console.error("invalid form");
		}
		console.log(this.state);
	};

	handleChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		let isEmail = 0;
		if (name === "emailOrMobile") {
			if (validate.verifyEmail(value)) {
				isEmail = 1;
			} else if (validate.verifyMobile(value)) {
				isEmail = 2;
			}
		}
		// console.log(emailOrMobileError);
		this.setState({
			[name]: value,
			isEmail: isEmail,
		});
		// console.log(this.state);
	};

	showPassword = (event) => {
		// console.log(event.target.previousSibling);
		const target = event.target;
		const sibling = target.previousSibling;
		sibling.type === "password"
			? (sibling.type = "text")
			: (sibling.type = "password");

		target.classList.value =
			target.classList.value === "fas fa-eye show-eye"
				? "fas fa-eye-slash show-eye"
				: "fas fa-eye show-eye";
	};

	render() {
		return (
			<div className="signup-container">
				<div className="signup">
					<div className="signup-form-container">
						<form
							onSubmit={this.handleSubmit}
							className="signup-form">
							<h1 className="form-title">Sign In</h1>
							<div className="divToAddTooltip">
								<input
									className={
										this.state.isEmail === 0
											? "form-group error"
											: "form-group"
									}
									name="emailOrMobile"
									id="emailOrMobile"
									placeholder="Email or Mobile number*"
									autoFocus
									onChange={this.handleChange}
								/>
								<span className="tooltiptext">
									<i className="fas fa-info-circle"></i>
									<span
										className="tooltiptextSecond"
										style={{ minWidth: 160 + "px" }}>
										don't forget @ in email
										<br />
										if using number, don't add +91 or 0
									</span>
								</span>
							</div>
							<div className="divToAddTooltip">
								<input
									className="form-group"
									type="password"
									name="password"
									placeholder="Password*"
									onChange={this.handleChange}
								/>
								<i
									className="fas fa-eye show-eye"
									onClick={this.showPassword}></i>
							</div>
							<input
								type="submit"
								name="submit-btn"
								id="submit-btn"
								className="form-group submit-btn"
								value="Sign In"
							/>
						</form>
						<div className="line-container">
							<hr className="line left" />
							OR
							<hr className="line right" />
						</div>
						<div className="social-login">
							Sign In with
							<br /> <br />
							<i
								className="fab fa-linkedin-in social-icon"
								style={{ color: "#2867B2" }}></i>
							<i
								className="fab fa-google social-icon"
								style={{ color: "#d34836" }}></i>
							<i
								className="fa fa-facebook social-icon"
								style={{ color: "#3b5998" }}></i>
						</div>
					</div>
					<div className="signup-img-container">
						<img
							className="signup-img"
							src={loginImg}
							alt="Advolet signup"
							style={{ maxWidth: "75%", margin: "auto" }}
						/>
						<p>
							Yet not connected with US?
							<br />
							<a href="#" className="create-login-account">
								Create an Account
							</a>
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Signin;
