import React from "react"



function GetPools(props) {

    const [isLoading, setIsLoading] = React.useState(false);
    const [poolList, setPoolList] = React.useState([])

    const body = {
        "operationName": "pools",
        "variables": {
            "tokens": [
                "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
            ],
            "id": "eth"
        },
        "query": "query pools($tokens: [Bytes]!, $id: String) {\n  as0: pools(where: {token0_in: $tokens}, subgraphError: allow) {\n    id\n    feeTier\n    token0 {\n      id\n      symbol\n      name\n      __typename\n    }\n    token1 {\n      id\n      symbol\n      name\n      __typename\n    }\n    __typename\n  }\n  as1: pools(where: {token1_in: $tokens}, subgraphError: allow) {\n    id\n    feeTier\n    token0 {\n      id\n      symbol\n      name\n      __typename\n    }\n    token1 {\n      id\n      symbol\n      name\n      __typename\n    }\n    __typename\n  }\n  asAddress: pools(where: {id: $id}, subgraphError: allow) {\n    id\n    feeTier\n    token0 {\n      id\n      symbol\n      name\n      __typename\n    }\n    token1 {\n      id\n      symbol\n      name\n      __typename\n    }\n    __typename\n  }\n}\n"
    }

    React.useEffect((props) => {
        //setIsLoading(true)
		fetch("https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3", {
			"method": "POST",
			"headers": {
                "accept": "*/*",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "en-US,en;q=0.9",
                "content-length": "2829",
                "content-type": "application/json",
                "origin": "https://info.uniswap.org",
                "referer": "https://info.uniswap.org/",
            },
            "body": JSON.stringify(body)
		})
		.then(response => response.json())
		.then(data => {
            console.log(data)
            //setIsLoading(false)
		})
    });

    return <h2 style={{"color": "white"}}>Loading...</h2>
    
    if (isLoading) { //Displayed when loading
        return <h2 style={{"color": "white"}}>Loading...</h2>
    } else { //Displays a list of licenses for the current page
        return <h2 style={{"color": "black"}}>Done Loading</h2>
        //return currentPageLicenses.map(license => <LicenseItem key={license._id} licenseRaw={license} setOverlayLicense={props.setOverlayLicense} setOverlayVisible={props.setOverlayVisible}/>)
    }
}

export default GetPools