import Image from "next/image";
import banner from "@/public/family_blue_banner.jpg";


export default function BottomBanner(){
    return(
        <>
        <div style={{
                position: 'absolute', color: 'white', fontSize: 'x-large', left: '34%',
                marginTop: '12px', fontWeight: 500
            }}>
                VITAL INFORMATION ABOUT YOUR CHILDREN <br /> FOR YOU AND LAW ENFORCEMENT AGENCIES</div>
            <div style={{ display: 'inline-flex', background: '#486377', width: '100%', border: 'solid thick #2893e17a' }}>
                <span style={{ flex: 1, color: '#486377' }}>x</span>
                <Image src={banner} alt="banner" width={1000} />
                <span style={{ flex: 1, color: '#486377' }}>x</span>
            </div>
        </>
    )
}