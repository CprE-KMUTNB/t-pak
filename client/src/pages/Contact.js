import"./contact.css"
import Line from "../pictures/LINE_icon.png"
export default function Contact(){
    return (
        
    <div>
        <div className="header" >
                CONTACT US    
        </div>
        <div className="background">
            <div className="facebook">
                
                Facebook : T-pak
                
            </div>
            <div className="line">
                <img src={Line}></img> Line : T-pak
            </div>
            <div className="call">
                Call : 088-753-0291
            </div>
            
        </div>
    </div>
    )
    
}