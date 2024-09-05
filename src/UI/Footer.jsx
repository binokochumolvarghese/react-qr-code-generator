const Footer = () => {

const d = new Date();
let year = d.getFullYear();

return(
  <footer >
    <div className="  p-6 text-center  bottom-0">
      <span>QR Code Generator © {year} </span>
      <br/>
      <a className="font-light" href="https://binovarghese.com/">
        Made with ✨ by Bino
      </a>
    </div>
  </footer>
)
};

export default Footer;
