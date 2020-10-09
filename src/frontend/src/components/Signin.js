import React from "react";
import "../assets/css/signup.css";
import "../assets/css/signin.css";
import loginImg from "../assets/img/Login-bro.svg";

const emailRegex = RegExp(
	/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class Signin extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: null,
			password: null,
		};
	}

	handleSubmit = (event) => {
		event.preventDefault();
		// console.log("no reload again");
		if (emailRegex.test(this.state.email)) {
			console.log("----Submitting----");
			// console.log(this.state);
		} else {
			console.error("INVALID EMAIL");
		}
	};

	handleChange = (event) => {
		event.preventDefault();
		this.setState({
			[event.target.name]: event.target.value,
		});
		// console.log(this.state);
	};

	showPassword = (event) => {
		// console.log(event.target.previousSibling);
		event.target.previousSibling.type === "password"
			? (event.target.previousSibling.type = "text")
			: (event.target.previousSibling.type = "password");

		event.target.classList.value =
			event.target.classList.value === "far fa-eye show-eye"
				? "fas fa-eye-slash show-eye"
				: "far fa-eye show-eye";
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
										emailRegex.test(this.state.email) ||
										this.state.email === null
											? "form-group"
											: "form-group error"
									}
									name="email"
									id="email"
									placeholder="Email*"
									autoFocus
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
									className="form-group"
									type="password"
									name="password"
									placeholder="Password*"
									onChange={this.handleChange}
								/>
								<i
									className="far fa-eye show-eye"
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
						<hr className="hr-line" />
						<div className="social-login">
							Login with
							<br /> <br />
							<i
								className="fab fa-linkedin social-icon"
								style={{ color: "#2867B2" }}></i>
							<i
								className="fab fa-google social-icon"
								style={{ color: "#d34836" }}></i>
						</div>
					</div>
					<div className="signup-img-container">
						<img
							className="signup-img"
							src={loginImg}
							alt="Advolet signup"
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
