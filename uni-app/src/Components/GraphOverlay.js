import React from "react";

import {Line} from "react-chartjs-2"

import Box from '@mui/material/Box';

function GraphOverlay(props) {
    
    //const data = props.graphData
    const data = {'worst': [0.9949105615628308, 0.994682804773584, 0.9941665581711479, 0.9899916781422756, 0.9940913539088088, 0.9919196026052033, 0.9880980858245235, 0.9923310882123213, 0.9934187035587682, 0.9909267688046585, 0.9911249614744944, 0.9796585375059574, 0.9739583834444512, 0.9729490796651513, 0.9751704521440552, 0.9744170355281995, 0.9623685463891642, 0.9499148772120661, 0.9444819823672886, 0.9316437001108481, 0.9431670041117776, 0.941739584735157, 0.9421966612018551, 0.9436789328000192, 0.9270486321375774, 0.9391842239649136, 0.9388615671500188, 0.9437397598670703, 0.930505034272906, 0.9357970063522245, 0.9257929000237395, 0.9070290743853086, 0.9223956954393298, 0.9090518342434865, 0.9159760477585409, 0.9333628930158036, 0.9222917258621841, 0.9249796850645978, 0.9253106421037288, 0.9345051674339626, 0.9294274737255169, 0.9261095132524484, 0.9040507276954788, 0.9028285157083016, 0.8709273799566922, 0.8837231028775724, 0.8511199358253231, 0.858282405953384, 0.9104388148229309, 0.8813351286774342], 'best': [1.0047909977786715, 1.008141541193575, 1.0097226392040257, 1.0137195518021553, 1.0133107375714363, 1.0148869117706134, 1.0150047363856585, 1.0144726059163127, 1.0148166695171414, 1.0148774973335173, 1.0148523341187055, 1.0148716818559966, 1.0147993532582873, 1.0141595745730723, 1.0150112122223551, 1.014594809451363, 1.0152255424143213, 1.0151435782269767, 1.0151700953921838, 1.0148296910481374, 1.0139585249105407, 1.0147780002515612, 1.0148209766691254, 1.0146865258370257, 1.0147320261131052, 1.0147811990883433, 1.0148413241600582, 1.0151268885031106, 1.0151939476480445, 1.0155208090278225, 1.0156176349995443], 'median': [1.0013346824074856, 1.0028533147505896, 1.0037828421423525, 1.0040353115629415, 1.005965896609155, 1.0060632771075495, 1.005344856393554, 1.0061669920773681, 1.0074115574559188, 1.0069079336346427, 1.006612576922906, 1.0045332803311895, 1.0045940843663488, 1.0078539370476827, 1.0052601020514362, 1.0084414297227458, 1.006118027444182, 1.0008624250383744, 1.0048823087032674, 0.9988988233504564, 1.0032450326358657, 1.001030601205451, 1.000630875297803, 1.0002431471994757, 1.0015769917792423, 1.0060477791417584, 1.0019970995885183, 0.9990748642208344, 0.997511907690193, 0.9976359411691159, 0.9950432661536796, 0.9932500964206841, 0.9931025236122203, 0.9987129801796611, 0.9956958788364921, 0.9837751888450811, 0.9898246179179645, 0.988868182622868, 0.9891059399341547, 0.9936277325359971, 0.9914246755703255, 0.9810624629666169, 0.9860025217717829, 0.9869653988478367, 0.9908178180950037, 0.9924472015963168, 0.9973010094477963, 0.9965026275193661, 0.9972517936774347, 0.9992570174847838], 'first': [0.9988035409802655, 1.001038381745823, 1.0026572947032448, 1.0000727368813545, 1.001189696054061, 1.0022237556028186, 1.0022397015505302, 1.0006498184396337, 0.9992736913051498, 0.998337176802249, 0.9955850605876184, 0.9966625478006063, 0.9953959806925471, 0.9862220966865792, 0.991344140219757, 0.9964076111354566, 0.9925850979532969, 0.9954398807586161, 0.9911823629193512, 0.990122836057309, 0.9909877331812478, 0.9949022890931105, 0.9904436745798897, 0.9921721949433151, 0.9934728664985173, 0.9876517118019166, 0.9874203909930137, 0.977244838501336, 0.9783389406203985, 0.9704138241218949, 0.973727509753502, 0.966358296687774, 0.977813491688572, 0.98194793437683, 0.9794626616088056, 0.9750297789743452, 0.9780806106119488, 0.9688164900631575, 0.9625100622803593, 0.9614063397716458, 0.9696216170090937, 0.9481233706132144, 0.9540001180240333, 0.9603970193752035, 0.9548187676080245, 0.9582379776869259, 0.9465939976921557, 0.9519482152650215, 0.9395105044597828, 0.9517711510621605], 'third': [1.0032077698977153, 1.0039091578917538, 1.005606916193437, 1.0092818248742705, 1.0122953893277629, 1.0117855360762242, 1.0119650763921253, 1.0126157965083178, 1.0135198061983852, 1.0112824528232447, 1.0123722830302933, 1.0109439192497827, 1.0125089619072052, 1.0118311170845324, 1.010705159756877, 1.0118760088692413, 1.0114490732781098, 1.013246594529537, 1.012376486469642, 1.0107699309367537, 1.0108982594575553, 1.0124989399003494, 1.0128823506203677, 1.0118283422366245, 1.0116082807506068, 1.0139943761418457, 1.012018314819792, 1.0139622974671962, 1.0138428405878055, 1.0083223453304795, 1.0112674288617693, 1.0077936445674471, 1.0098055172473148, 1.007746145599343, 1.0090525707814915, 1.0067658850758527, 1.0128725891866106, 1.0127138408147571, 1.0123956713260913, 1.0122246416844007, 1.0096423368850176, 1.0109579888605074, 1.0132849860032536, 1.0116558426170228, 1.0121845693293787, 1.0071400912220245, 1.010539422094995, 1.0104277071529197, 1.013028872792429, 1.013669492992197]}

    return (
        <div
        style={{
            width: '100vw',
            height: '100vh',
            backgroundColor: "white",
            position: "absolute",
            zIndex: "100"
        }}
        >
      <Line
        data = {{
          labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
          datasets: [
            {
              label: 'Bottom 5%',
              data: data['worst'],
              backgroundColor: 'red',
              borderColor: 'red'
            }, 
            {
                label: 'First Quartile',
                data: data['first'],
                backgroundColor: 'black',
                borderColor: 'black'
              }, 
            {
              label: 'Median',
              data: data['median'],
              backgroundColor: 'blue',
              borderColor: 'blue'
            }, 
            {
                label: 'Third Quartile',
                data: data['third'],
                backgroundColor: 'black',
                borderColor: 'black'
              }, 
              {
                label: 'Best',
                data: data['best'],
                backgroundColor: 'green',
                borderColor: 'green'
              }, 
          ]
        }}
        options = {{
          interaction: {
            mode: 'index',
            axis: 'x',
            intersect: false
          },
          borderColor: "#000000",
          backgroundColor: "#000000",
          pointBackgroundColor: "#f731ed",
          scales: {
            xAxis: {
              scaleId: 'xAxis',
              type: 'linear',
              beginAtZero: true,
              min: 0,
              ticks: {
                color: "#000000"
              },
              grid: {
                color: "#adadad",
              },
            },
            yAxis: {
              ticks: {
                color: "#000000"
              },
              grid: {
                color: "#adadad"
              },
              min: 0.9,
              max: 1.05
            }
          },
        }}
        style={{
            color: "black"
        }}
      
      />
    </div>
    )
}
export default GraphOverlay