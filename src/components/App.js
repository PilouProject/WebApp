import React, {Component, useEffect, useState, useRef} from 'react';
import ReactDom, { createPortal } from 'react-dom';

function dynamicSort(property) {
  return function(a, b) {
      return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
  }
}

const PrintShape = ({obj}) => {
  console.log(obj);
  const obj_css = {width: obj.Width, height: obj.Height}

  return (
    <span className={obj.FormType} style={obj_css}></span>
  );
}

const PrintShapes = ({jsonipunt}) => {
  return (
    <div className='div-shapes'>
      {jsonipunt.map((obj) => (
        <PrintShape obj={obj}/>
      ))}
    </div>
  );
}

const GetJsonFileData = ({setJsonInput}) => {

  const getFile = (e) => {
    const file = e.target.files[0];

    var reader = new FileReader();

    reader.onload = function(event) {
      const tmp_jsonObj = JSON.parse(event.target.result);

      const jsonObj =  tmp_jsonObj.Shapes.filter((obj) => {
        if (obj.FormType == "Circle" || obj.FormType == "Text" || obj.FormType == "Rectangle") {
          obj.FormType = obj.FormType.toLowerCase();
          return true;
        }

        return false;
      });

      jsonObj.sort(dynamicSort('Order')).sort(dynamicSort('Order'));

      setJsonInput(jsonObj);    
    }
  
    reader.readAsText(file);
  }

  return (
    <div>
      <input onChange={getFile} type="file"/>
    </div>
  );
}

export function App({ initialData }) {
const [jsonipunt, setJsonInput] = React.useState([]);
//const [shapes, setShapes] = React.useState([]);

 useEffect(() => {
  if (jsonipunt.length > 0) {
    console.log(jsonipunt);
  }
}, [jsonipunt]);

  return (
    <div className="TestTech">
      <header>
        <h2> My protrait</h2>
      </header>
      <GetJsonFileData setJsonInput={setJsonInput}/>
      <PrintShapes jsonipunt={jsonipunt}/>
    </div>
  );
}
