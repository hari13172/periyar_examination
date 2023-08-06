import Link from "next/link";


export default function header() {
    return (
        <div className="periyar-research-header">
            <a href="/">
                <img src="/periyar.png" alt="Logo" />
            </a>
            <div className="periyar-research-header1">
                <div className="periyar-research-header2">
                    <h3 className="logotexttamil">பெரியார் பல்கலைக்கழகம்</h3>
                    <h5 className="logotamil">அரசு பல்கலைக்கழகம், சேலம்.</h5>
                    <h2 className="logotexteng">PERIYAR UNIVERSITY</h2>
                    <div className="logotext-div">
                        <h5 className="logotext">
                            NAAC {"'"}A++{"'"} Grade with CGPA 3.61 {"("}Cycle - 3{")"}
                        </h5>
                        <h5 className="logotext">
                            {" "}
                            State University - NIRF Rank 59 - NIRF Innovation Band of 11-50
                        </h5>
                        <h5 className="logotext">Salem-636011, Tamilnadu, India.</h5>
                    </div>
                </div>
            </div>
            <div className="col-md-2 text-center">
                <img rel="preload" as="image" src="/periyar1.jpg" alt="Logo" />
                {/* <Link href="http://65.0.100.133/rsm" target="_blank">
                    <h5 id="researchportal">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <b>research online portal</b>
                    </h5>
                </Link> */}
            </div>
        </div>
    );
}