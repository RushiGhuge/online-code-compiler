import React from 'react';
import logo from '../logo.svg'
const Output = ({ props }) => {

    const { codeInput, setCodeInput } = props;
    // const [textCodeInput, setTextCodeInput] = useState('');
    // useEffect(()=>{
    //     setCodeInput(textCodeInput);
    // }, [textCodeInput])

    let output = props.output;
    let isRightShow;

    // console.log(props.rightPanelWidth);

    if (props.rightPanelWidth <= 0) {
        isRightShow = 'none';
    }
    else {
        isRightShow = 'block';
    }

    // console.log(isRightShow);
    return (
        <div id='rightPanel' className='output' style={{ width: `${props.rightPanelWidth}px`, display: `${isRightShow}` }} >
            <p className='outputHeading'>Your Output <button onClick={() => {
                props.setOutput('')
                setCodeInput('')
            }
            }>Clear</button></p>
            {/* text area for set the input and get output as well */}
            <textarea name="" id="" placeholder='Add Input If Needed!' value={codeInput} onChange={(e) => setCodeInput(e.target.value)}></textarea>

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
