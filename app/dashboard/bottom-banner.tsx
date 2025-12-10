import Image from "next/image";
import banner from "@/public/family_blue_banner.jpg";
import './bottom-banner.css';


export default function BottomBanner(){
    return(
        <div className="bannerPlace">
        <div className="bannerText">
                VITAL INFORMATION ABOUT YOUR CHILDREN <br /> FOR YOU AND LAW ENFORCEMENT AGENCIES</div>
            <div style={{ display: 'inline-flex', background: '#486377', width: '100%', border: 'solid thick #2893e17a' }}>
                <span style={{ flex: 1, color: '#486377' }}>x</span>
                <Image src={banner} alt="banner" width={1000} />
                <span style={{ flex: 1, color: '#486377' }}>x</span>
            </div>
        </div>
    )
}