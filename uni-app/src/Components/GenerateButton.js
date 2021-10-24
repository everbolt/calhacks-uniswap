import React from "react";
import Button from '@mui/material/Button';
import axios from "axios"

function GenerateButton(props) {
    const [generatedData, setGeneratedData] = React.useState([]);

    function handleClick() {
        // const APIpoolid = props.APIpoolid
        // const APIlowerbound = props.APIlowerbound
        // const APIupperbound = props.APIupperbound
        // const APItoken0quantity = props.APItoken0quantity
        // const APItoken1quantity = props.APItoken1quantity
        const APIpoolid = "0xcbcdf9626bc03e24f779434178a73a0b4bad62ed"
        const APIlowerbound = "14.194650320778567"
        const APIupperbound = "15.624815006529442"
        const APItoken0quantity = "100"
        const APItoken1quantity = "1667.4463092538679"
        const sampleSize = 20
        const get_url = (
            "https://q3gskiv7g6.execute-api.us-west-1.amazonaws.com/default/calhacks-2021?" +
            "pool_id=" + APIpoolid + 
            "&lower_bound=" + APIlowerbound + 
            "&upper_bound=" + APIupperbound + 
            "&token0_quantity=" + APItoken0quantity + 
            "&token1_quantity=" + APItoken1quantity + 
            "&sample_size=" + sampleSize
        )
        props.setAPIloading(true)
        async function getData() {
            await axios(get_url)
            .then((response) => {
                console.log("RES DATA:", response.data)
                props.setGeneratedData(response.data)
            })
            .catch((error) => {
                console.log("ERROR FETCHING:", error)
            })
            .finally(() => {
                props.setAPIloading(false)
                props.setFinishedGeneration(true)
            })
        }
        console.log("About to start")
        getData()
    }

    return(
        <Button
            variant="contained"
            style={{
            marginLeft: "16px",
            marginTop: "40px",
            backgroundColor: "#FF7FBF",
            fontWeight: "bold",
            fontSize: "20px",
            height: "65px",
            width: "200px"
            }}
            onClick={handleClick}
        >
            🦄 Generate 🦄
        </Button>
    )

}

export default GenerateButton