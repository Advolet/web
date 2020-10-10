import React from "react";
import "../assets/css/signup.css";
import validate from "./Validation";
import signupImg from "../assets/img/signup.svg";

class Signup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: null,
			email: null,
			contact: null,
			password: null,
			confPassword: null,
			formErrors: {
				name: "",
				email: "",
				contact: "",
				password: "",
				confPassword: "",
			},
		};
	}

	formValid = ({ formErrors, ...rest }) => {
		let valid = true;

		// validate form errors being empty
		Object.values(formErrors).forEach((val) => {
			if (val.length > 0) {
				valid = false;
			}
		});

		// validate null form
		Object.keys(rest).forEach((val) => {
			// console.log(val);
			if (this.state[val] === null) {
				valid = false;
				this.setState((prevState) => ({
					formErrors: {
						...prevState.formErrors,
						[val]: "Please fill this form samjhe",
					},
				}));
			}
			// console.log(this.state);
		});

		return valid;
	};

	handleSubmit = (event) => {
		event.preventDefault();
		if (this.formValid(this.state)) {
			console.log(`
        --SUBMITTING--
      `);
		} else {
			console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
		}
	};

	handleChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		let formErrors = { ...this.state.formErrors };

		switch (name) {
			case "name":
				formErrors.name =
					value.length < 5 ? "minimum 5 characaters required" : "";
				break;
			case "email":
				formErrors.email = validate.verifyEmail(value)
					? ""
					: "invalid email address";
				break;
			case "contact":
				formErrors.contact = validate.verifyMobile(value.trim())
					? ""
					: "10 characaters required";
				break;
			case "password":
				formErrors.password = validate.verifyPassword(value)
					? ""
					: "invalid password";
				break;
			case "confPassword":
				formErrors.confPassword =
					this.state.password === value
						? ""
						: "Passwords do not match";
				break;
			default:
				break;
		}

		this.setState({ formErrors, [name]: value });
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
		const formErrors = this.state.formErrors;

		return (
			<div className="signup-container">
				<div className="signup">
					<div className="signup-form-container">
						<form
							onSubmit={this.handleSubmit}
							className="signup-form">
							<h1 className="form-title">Sign Up</h1>
							<div className="divToAddTooltip">
								<input
									className={
										formErrors.name.length > 0
											? "form-group error"
											: "form-group"
									}
									type="text"
									name="name"
									placeholder="Full Name*"
									onChange={this.handleChange}
									autoFocus
								/>

								<span className="tooltiptext">
									<i className="fas fa-info-circle"></i>
									<span className="tooltiptextSecond">
										At least 5 characaters
									</span>
								</span>
							</div>
							<div className="divToAddTooltip">
								<input
									className={
										formErrors.email.length > 0
											? "form-group error"
											: "form-group"
									}
									name="email"
									id="email"
									placeholder="Email*"
									onChange={this.handleChange}
								/>
								<span className="tooltiptext">
									<i className="fas fa-info-circle"></i>
									<span className="tooltiptextSecond">
										don't forget @
									</span>
								</span>
							</div>
							<div className="divToAddTooltip">
								<input
									className={
										formErrors.contact.length > 0
											? "form-group error"
											: "form-group"
									}
									type="number"
									name="contact"
									placeholder="Contact Number"
									onChange={this.handleChange}
								/>
								<span className="tooltiptext">
									<i className="fas fa-info-circle"></i>
									<span className="tooltiptextSecond">
										without 0 or +91
									</span>
								</span>
							</div>
							<div className="divToAddTooltip">
								<input
									className={
										formErrors.password.length > 0
											? "form-group error"
											: "form-group"
									}
									type="password"
									name="password"
									placeholder="Password*"
									onChange={this.handleChange}
								/>
								<i
									className="fas fa-eye show-eye"
									onClick={this.showPassword}></i>
								<span className="tooltiptext">
									<i className="fas fa-info-circle"></i>
									<span className="tooltiptextSecond">
										Minimum eight characters, at least one
										letter and one number, allowed special
										characaters !@#$%^&*, space not allowed
									</span>
								</span>
							</div>
							<div className="divToAddTooltip">
								<input
									className={
										formErrors.confPassword.length > 0
											? "form-group error"
											: "form-group"
									}
									type="password"
									name="confPassword"
									placeholder="Confirm password*"
									onChange={this.handleChange}
								/>
								<i
									className="fas fa-eye show-eye"
									onClick={this.showPassword}></i>
							</div>
							<label
								htmlFor="agree-terms"
								className="form-group agree">
								<input
									type="checkbox"
									name="agree-terms"
									id="agree-terms"
									required
								/>
								I agree to Terms and Conditions
							</label>
							<input
								type="submit"
								name="submit-btn"
								id="submit-btn"
								className="form-group submit-btn"
								value="Sign Up"
							/>
						</form>
						<hr className="hr-line" />
						<p>
							Already with US?{" "}
							<a href="#" className="create-login-account">
								Sign In instead
							</a>
						</p>
					</div>
					<div className="signup-img-container">
						<img
							className="signup-img"
							src={signupImg}
							alt="Advolet signup"
						/>
						<div className="social-login">
							Create account with
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
				</div>
			</div>
		);
	}
}

export default Signup;
