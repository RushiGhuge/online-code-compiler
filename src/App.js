import './App.css';
import axios from 'axios';
import Input from './Componats/input';
import Output from './Componats/output';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { IoEllipsisVertical } from "react-icons/io5";



function App() {

  const [code, setCode] = useState('');
  const [lang, setLang] = useState('javascript,index.js');
  const [output, setOutput] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [fontsize, setFontSize] = useState(14);
  const [theme, setTheme] = useState('monokai')
  const [mainTheme, setMainTheme] = useState('dark');
  const [loder, setLoder] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState()
  const [rightPanelWidth, setRightPanelWidth] = useState(600)
  // const [hideRightPanel, setHideRightPanel] = useState(false);

  // console.log(rightPanelWidth);


  const darkTheme = createTheme({
    palette: {
      mode: mainTheme,
    },
  });

  useEffect(() => {
    // when code is update...
    run()
  }, [code])

  const handleLang = (event) => {
    setLang(event.target.value);
  };

  function themeChange(e) {
    setTheme(e.target.value)
  }

  async function run() {
    console.log('Code');
    setOutput('')
    let language = lang.split(',');
    // console.log(output);
    // import axios from 'axios';
    const options = {
      method: 'POST',
      url: 'https://onecompiler-apis.p.rapidapi.com/api/v1/run',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'b8c82e04f9mshe3b6c2a05c17536p105a8djsn8f140a1496c3',
        'X-RapidAPI-Host': 'onecompiler-apis.p.rapidapi.com'
      },
      data: {
        language: `${language[0]}`,
        stdin: `${codeInput}`,
        files: [
          {
            name: `${language[1]}`,
            content: code
          }
        ]
      }
    };

    try {
      setLoder(true) // add loader until data not recive...
      const response = await axios.request(options);
      console.log(response.data);
      setOutput(response.data)
      setLoder(false) // add loader until data not recive...
    } catch (error) {
      setOutput(error)
      // console.error(error.stderr);
    }
  }

  function handleMouseMove(e) {
    // const leftPanel = document.getElementById('leftPanel');
    const centerBar = document.getElementById('centerBar');
    // const rightPanel = document.getElementById('righPanel');

    // // base case
    const newX = e.clientX;
    const leftPanelWidth = newX;
    const rightPanel = window.innerWidth - newX - centerBar.offsetWidth;;

    setLeftPanelWidth(`${leftPanelWidth}px`)
    setRightPanelWidth(rightPanel)
  }

  function handleTouchMove(e) {
    // const leftPanel = document.getElementById('leftPanel');
    const centerBar = document.getElementById('centerBar');
    // const rightPanel = document.getElementById('righPanel');

    // // base case
    const newX = e.touches[0].clientX;
    const leftPanelWidth = newX;
    const rightPanel = window.innerWidth - newX - centerBar.offsetWidth;;

    setLeftPanelWidth(`${leftPanelWidth}px`)
    setRightPanelWidth(rightPanel)
  }

  // this function is for adjust the width of panels 

  function startResize(e) {
    e.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopResize);
  }

  function stopResize() {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopResize);
  }

  function startResizeTouch(e) {
    if (e.cancelable) {
      e.preventDefault();
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', stopResizeTouch);
    }
  }

  function stopResizeTouch(e) {
    if (e.cancelable) {
      e.preventDefault();
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', stopResizeTouch);
    }
  }

  useEffect(() => {
    document.getElementById('centerBar').addEventListener('touchmove', startResizeTouch)
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme />
      <div className="App">
        <header className='heading'>

          <h1>Code Compiler</h1>

          <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small" >
              <InputLabel id="demo-simple-select-label">Lang</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={lang}
                label="Age"
                onChange={handleLang}
              >
                <MenuItem value="java,main.java">Java</MenuItem>
                <MenuItem value="javascript,index.js">Javascript</MenuItem>
                <MenuItem value="cpp,main.cpp">CPP</MenuItem>
                <MenuItem value="c,main.c">C</MenuItem>
                <MenuItem value="python,main.py">Python</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small" >
              <InputLabel id="demo-simple-select-label2">Themes</InputLabel>
              <Select
                // labelId="demo-simple-select-label"
                // id="demo-simple-select"
                value={theme}
                label="Theme"
                onChange={themeChange}
              >
                <MenuItem value="darcula">Darcula</MenuItem>
                <MenuItem value="monokai">Monokai</MenuItem>
                <MenuItem value="githubLight">Github Light</MenuItem>
                <MenuItem value="githubDark">Github Dark</MenuItem>
                <MenuItem value="material">Material</MenuItem>
                <MenuItem value="vscodeDark">Vs Code Dark</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <div className='sliderContainer'>
            <label htmlFor="slider">Font Size</label>
            <Slider getAriaValueText={(e) => { setTimeout(() => { setFontSize(e) }) }} color="secondary" defaultValue={20} step={2} marks min={10} max={40} />
          </div>

          <FormControlLabel control={<Switch defaultChecked
            onClick={(e) => {
              if (e.target.checked) {
                // dark
                setMainTheme('dark')
              }
              else {
                // light
                setMainTheme('light')
              }
            }} />} label={mainTheme} />

        </header>


        <div className="container">
          <Input props={{ code, setCode, run, fontsize, lang, setLang, theme, leftPanelWidth }} />

          <div id='centerBar' onMouseDown={startResize} ><IoEllipsisVertical /></div>

          <Output props={{ output, setOutput, loder, rightPanelWidth, setCodeInput, codeInput }} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;



