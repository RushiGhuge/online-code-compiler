import React, { useDebugValue, useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import Button from '@mui/material/Button';
import { darcula, githubDark, githubLight, monokai, material, vscodeDark } from '@uiw/codemirror-themes-all';


let i = 0;
const Input = ({ props }) => {

    let theme = selectTheme(props.theme)

    const [value, setValue] = useState("console.log('hello world!');");

    useEffect(() => {
        if (props.lang === 'java,main.java') {
            setValue(`public class main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }   
}`)
        }

        else if (props.lang === 'javascript,index.js') {
            setValue("console.log('hello world!');")
        }
        else if (props.lang === 'cpp,main.cpp') {
            setValue(`#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`)
        }
        else if (props.lang === 'python,main.py') {
            setValue('print("Hello World!")')
        }
        else if (props.lang === 'c,main.c') {
            setValue(`#include <stdio.h>

int main() {
    printf("Hello, World!");
    return 0;
}`)
        }
    }, [props.lang])

    function onChange(e) {
        setValue(e)
    }

    function handelRun() {
        i++;
        console.log('code setted!!!');
        props.setCode(value + `//${i}`)
        // props.run();
    }

    return <div id='leftPanel' className='textEditor' style={{ width: props.leftPanelWidth }}>
        <CodeMirror
            theme={theme} style={{ fontSize: `${props.fontsize}px` }} value={value} height="90vh" width='100%' extensions={[javascript({ jsx: true })]} onChange={onChange} />
        <div className="run-btn">

            <Button size="small" className="run-btn" variant="contained" color="success"
                onClick={handelRun}
            >
                RUN
            </Button>
        </div>

    </div>




}

function selectTheme(theme) {
    if (theme === 'darcula') {
        return darcula;
    }
    else if (theme === 'monokai') {
        return monokai;
    }
    else if (theme === 'githubLight') {
        return githubLight;
    }
    else if (theme === 'githubDark') {
        return githubDark;
    }
    else if (theme === 'material') {
        return material;
    }
    else if (theme === 'vscodeDark') {
        return vscodeDark;
    }
}
export default Input;

