import { MdOutlineDeleteOutline } from 'react-icons/md';
import { deleteGradeFunc, deleteStudentFunc } from './deleteFuncs'


const tblFuncsMap = new Map([
    ["gradesDelFunc", deleteGradeFunc],
    ["studentDelFunc", deleteStudentFunc]
])

const callDelFunction = (funcName, row) => {
    return tblFuncsMap.get(funcName)(row)
}

const Table = (props) => {
    console.log(props)
    if (props?.data && props?.headers)
    {
        return (
            <table>
                <thead>
                    <tr>
                        { props.headers.map((header, i) => {
                            return (<th key={i}>{header}</th>);
                        }) 
                        }
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((row, i) => {
                    return (
                    <tr key={i}>
                        { props.headers.map((header, k) => {
                            return (<td key={i+k}>{row[header]}</td>)
                          })
                          
                        }
                        {
                        props?.delFuncName &&
                        <h1><MdOutlineDeleteOutline onClick={() => {
                                if (callDelFunction(props.delFuncName, row))
                                {
                                    props.setSearchGrades(props.searchGrades.filter((grade, k) => k !== i))
                                }
                                
                            }
                            } /></h1>
                        }
                    </tr>
                    )})}
                </tbody>
            </table>
        );
    }
}

export default Table;