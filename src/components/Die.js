function Die(props){
    let styles = {
        backgroundColor: props.isHeld ? "#59E391" : ""
    }
    return(
        <div style={styles} className="die" onClick={()=>{props.click(props.id)}}>
            {props.value}
        </div>
    )
}

export default Die