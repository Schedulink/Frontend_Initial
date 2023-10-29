import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { AgGridReact } from 'ag-grid-react';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Selectoption = () => {

    const [deg,setDeg] = useState([])
    const [sem,setSem] = useState([])
    const [sub,setSub] = useState([])
    const [fac,setFac] = useState([])

    const [firstsem,setFirstsem] = useState([])
    const [secondsem,setSecondsem] = useState([])
    const [thirdsem,setThirdsem] = useState([])
    const [firstsub,setFirstsub] = useState([])
    const [firstfac,setFirstfac] = useState([])

    const API_DEG = 'http://localhost:3500/deg_prog';
    const API_SEM = 'http://localhost:3500/semester';
    const API_SUB = "http://localhost:3500/subject";
    const API_FAC = 'http://localhost:3500/faculty';

    useEffect(()=>{

        Axios.get(API_DEG).then(res => setDeg(res.data))

        Axios.get(API_SEM).then(res => setSem(res.data))

        Axios.get(API_SUB).then(res => setSub(res.data))

        Axios.get(API_FAC).then(res => setFac(res.data))

    },[])

    const handlesubmit = (e)=>{
        
        const data = sem.filter((d)=>(
            d.deg_name === e
        ))
        console.log(data)
        setFirstsem(data)
    }

    const handlereq_year = (e) => {
        const data = firstsem.filter((d)=>(
            d.req_year === e
        ))
        console.log(data)
        setSecondsem(data)
    }

    const handlesemester = (e)=>{

        const data = secondsem.filter((d)=>(
            d.sem === e
        ))
        console.log(data)
        setThirdsem(data)
    }

    //ag-grid code-subject table

    const columnDefs = [
        { headerName: "sem_Id", field: "sem_id"},
        { headerName: "sub_code", field: "sub_code"},
        { headerName: "sub_title", field: "sub_title"},
        { headerName: "req_year", field: "req_year"}
    ]

    // const rowData = [
    //     { sem_Id: 1, sub_code: 101, sub_title: "c", req_year: "2023"},
    //     { sem_Id: 2, sub_code: 102, sub_title: "digital system", req_year: "2023"},
    //     { sem_Id: 3, sub_code: 103, sub_title: "english", req_year: "2023"},
    // ]

    const defaultColDef = {
        sortable: true,
        filter: true,
        flex: 1
    }

    

    // const onGridReady = (params)=>{
    //     console.log("ready");
    //     Axios.get(API_SUB).then(res => {
    //         // console.log(res.data)
    //         params.api.applyTransaction({add:res.data})})
    // }

    const handlesubject = (e)=>{
        const a =Number(e.slice(3,4))
        const data = sub.filter((d)=>(
                d.sem_id === a
        ))
        setFirstsub(data)
    }

    //ag-grid --- faculty table

    const facultycolumns = [
        { headerName: "fac_Id", field: "fac_id"},
        { headerName: "fac_name", field: "fac_name"},
        { headerName: "sub_code", field: "sub_code"},
        { headerName: "sub_title", field: "sub_title"},
        { headerName: "Dept_name", field: "dept_name"}
    ]

    // const facultyrow = [
    //     { fac_Id: 1, fac_name: 101, sub_code: "c", dept_name: "2023"},
    //     { fac_Id: 2, fac_name: 102, sub_code: "digital system", dept_name: "2023"},
    //     { fac_Id: 3, fac_name: 103, sub_code: "english", dept_name: "2023"},
    // ]

    let code = "";

    const handlefaculty = (event)=>{
        const d =event.api.getSelectedRows()
        const s = d.values();
        for (const i of s){
            code = i.sub_code
        } 

        const data = fac.filter((d)=>(
            d.sub_code === code 
        ))
        setFirstfac(data)

    }

    //ag-grid -- overall table

    const overallcolumns = [
        { headerName: "s_no", field: "s_no"},
        { headerName: "sub_code", field: "sub_code"},
        { headerName: "sub_title", field: "sub_title"},
        { headerName: "fac_name", field: "fac_name"}
    ]

    // const overallrow = [
    //     { sub_code: 101, sub_title: "c", fac_name: "c-a"}
    // ]

    const [subfac,setSubfac] = useState([
        // {
        // s_no: "",
        // sub_code: "",
        // sub_title: "",
        // fac_name: ""
        // }
    ]);

    const addobject = (name,sub_code,title) =>{
        const newobj = {
            s_no: subfac.length + 1,
            sub_code : sub_code,
            sub_title: title,
            fac_name: name
        };
        setSubfac([...subfac,newobj])
        console.log(subfac)
    };

    let sub_code= "";
    let title ="";
    let name = "";

    const handlesubfac = (event)=>{
        const d =event.api.getSelectedRows()
        // console.log(d)
        const s = d.values();
        for (const i of s){
            name = i.fac_name
            sub_code = i.sub_code
            title = i.sub_title
        }
        console.log(name)
        console.log(title)
        console.log(sub_code)
        addobject(name,sub_code,title)
    }

    

  return (
    <div>
        {/* {console.log(code)} */}
        <select name="deg" onChange={e => handlesubmit(e.target.value)}>
            <option value="default">degree programme</option>
            {
                deg.map((d)=>(
                    <option key={d.id}>{d.deg_name}</option>
                ))
            }
        </select>

        <label>
            Pick a regulation:
            <select name="requlation" onChange={e => handlereq_year(e.target.value)}>
                <option value="default">choose 2019 or 2023</option>
                <option value="2019">2019</option>
                <option value="2023">2023</option>
            </select>
        </label>

        <label>
            Pick a semester:
            <select name="semester" onChange={e => handlesemester(e.target.value)}>
                <option value="default">choose odd or even</option>
                <option value="odd">odd</option>
                <option value="even">even</option>
            </select>
        </label>

        <select name="semnum" onChange={e => handlesubject(e.target.value)}>
            <option value="default">semester</option>
            {
                thirdsem.map((d)=>(
                    <option key={d.sem_id}>id:{d.sem_id} sem:{d.sem_num}</option>
                ))
            }
        </select>
            <br />
            <br />
        {/* subject-table */}
        <h3>Subject-table:</h3>
        <div className="ag-theme-alphine" style={{height: '200px'}} >
            <AgGridReact
                columnDefs={columnDefs}
                rowData={firstsub}
                defaultColDef={defaultColDef}
                rowSelection='single'
                onSelectionChanged={handlefaculty}
                // onGridReady={onGridReady}
            >

            </AgGridReact>
        </div>

        {/* faculty-table */}
        <h3>Faculty-table:</h3>
        <div className="ag-theme-alphine" style={{height: '200px'}} >
            <AgGridReact
                columnDefs={facultycolumns}
                rowData={firstfac}
                defaultColDef={defaultColDef}
                rowSelection='single'
                onSelectionChanged={handlesubfac}
                // onGridReady={onGridReady}
            >

            </AgGridReact>
        </div>

        {/* overall-table */}
        <h3>Overall-table:</h3>
        <div className="ag-theme-alphine" style={{height: '200px'}} >
            <AgGridReact
                columnDefs={overallcolumns}
                rowData={subfac}
                defaultColDef={defaultColDef}
                // onGridReady={onGridReady}
            >

            </AgGridReact>
        </div>

    </div>
  )
}

export default Selectoption