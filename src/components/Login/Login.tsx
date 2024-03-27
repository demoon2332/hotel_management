import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import {Link, useNavigate, useLocation} from "react-router-dom";
import { axiosPrivate } from "../../api/axiosPrivate";
import { FaEye,FaEyeSlash } from "react-icons/fa6";
import "../../styles/components/Login/style.css"
import loadingGif from "../../assets/loading.gif";

const LOGIN_URL = "/auth/login";




const Login= () => {
    const {login} = useAuth();
    const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

    
    const [isOpen, setOpen] = useState(false);
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);
  
    const [username, setUserName] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const togglePassword = () => {
      setPasswordShown(!passwordShown);
    };
  
    // useEffect with empty dependent array means --> this effect run only 1 time after component ui mounted
    useEffect(() => {
      setOpen(true);
      if(userRef.current)
        userRef.current.focus();
    }, []);

     // this effect will be re-render every time both user,pwd change
  useEffect(() => {
    setErrMsg("");
  }, [username, pwd]);

  const handleExit = () => {
    setOpen(false);
    const timer = setTimeout(()=>{
      navigate(-1);
    },1000);
    return () => clearTimeout(timer);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("thing sent");
      console.log(JSON.stringify({ username: username, password: pwd }));
      const response = await axiosPrivate.post(LOGIN_URL, {
        username: username,
        password: pwd,
      });
      console.log(JSON.stringify(response?.data));

      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;

      console.log("Access TOKEN: ", accessToken);
      login({ accessToken, refreshToken });
      setUserName("");
      setPwd("");
      if(accessToken){
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg(err.response.data.message);
      } else {
        setErrMsg("Login Failed");
      }
      if(errRef.current)
        errRef.current.focus();
    }
    finally {
      setLoading(false);
    }
  };


    return (
        <section id="login-section" className={`${isOpen ? "login-visible" : "login-hidden"}`}>
        <div className="form-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1 className="form-title">Hello, please login</h1>
              <div className="circle-close-btn danger-close-btn" onClick={handleExit}></div>
            </div>
  
            <span>
              {/* Bạn chưa có tài khoản sao ?{" "}
              <Link to="/register" className="form-register-link">
                Đăng ký ngay{" "}
              </Link>{" "} */}
            </span>
  
            {/* <label htmlFor="username">Username</label> */}
            <input
              type="text"
              placeholder="Tên tài khoản"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUserName(e.target.value)}
              value={username}
              required
            />
            {/* <label htmlFor="password">Password:</label> */}
            <div className="login-password-input-container">
              <input
                placeholder="Mật khẩu"
                type={passwordShown ? "text" : "password"}
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
              <div
                className="password-toggle-icon"
                onClick={togglePassword}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "1rem",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "var(--cancelColor)",
                }}
              >
                {passwordShown ? <FaEye/> : <FaEyeSlash/>}
              </div>
            </div>
            <small>
              <Link
                to="/reset"
                style={{ color: "var(--darkColor)", fontSize: "15px", textDecoration: "underline" }}
              >
                Bạn đã quên mật khẩu ?{" "}
              </Link>{" "}
            </small>
  
            <p
              ref={errRef}
              className={errMsg ? "errorMessage" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            {loading && <p><img src={loadingGif} width={80} alt="loading"/> </p>}
  
            <button className="btn" onClick={handleSubmit}>Đăng nhập</button>
          </form>
          <div></div>
        </div>
      </section>
    )
}

export default Login;