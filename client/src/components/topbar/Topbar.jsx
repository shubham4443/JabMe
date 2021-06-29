import "./topbar.css";
import { GithubOutlined } from "@ant-design/icons"
import JabMeIcon from "../../assets/jabme_icon.png";

const Topbar = () => {
    return (
        <div className="topbar">
            <span style={{ textAlign: "center" }}>
                <img src={JabMeIcon} style={{ width: 50, height: "auto" }} alt="jabmeicon" />
                <span style={{ fontSize: "1.5em", fontWeight: 500, verticalAlign: "middle" }}>JabMe</span>
                <br />
                <span style={{ fontWeight: 500 }}>A COVID-19 Vaccine Notifier App</span>
            </span>
            <span className="topbar_links">
                <a href="https://shubham4443.web.app/" target="_blank" rel="noreferrer" style={{ color: "black", marginRight: 20 }}>Portfolio</a>
                <a href="https://github.com/shubham4443/JabMe" target="_blank" rel="noreferrer" style={{ color: "black" }}><GithubOutlined /> Github</a>
            </span>
        </div>
    )
}

export default Topbar;