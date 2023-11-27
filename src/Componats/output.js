import React from 'react';
import logo from '../logo.svg'
const Output = ({ props }) => {
    let output = props.output;

    let isRightShow;
    console.log(props.rightPanelWidth);
    if (props.rightPanelWidth <= 0) {
        isRightShow = 'none';
    }
    else {
        isRightShow = 'block';
    }

    console.log(isRightShow);
    return (
        <div id='rightPanel' className='output' style={{ width: `${props.rightPanelWidth}px`, display:`${isRightShow}`}} >
            <p className='outputHeading'>Your Output <button onClick={() => props.setOutput('')}>Clear</button></p>

            {props.loder &&
                <div className='loading'>
                    <img src={logo} alt="" />
                </div>
            }

            {output.stdout && <div className='outputString'>{output.stdout.split('\n').map((ele, idx) => <p key={idx}>{ele}</p>)}</div>}
            {output.stderr && <div className='error'>{output.stderr.split('\n').map((ele, idx) => <p key={idx}>{ele}</p>)}</div>}

        </div>
    );
}

export default Output;
