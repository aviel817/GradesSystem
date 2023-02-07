import { MdOutlineDeleteOutline } from 'react-icons/md';

function deleteRow(deleteRow) 
{
    console.log(deleteRow)
    console.log("ID: " + deleteRow.ID)
    console.log("TYPE: " + deleteRow.Type)
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
                        <h1><MdOutlineDeleteOutline onClick={() => deleteRow(row)}/></h1>
                    </tr>
                    )})}
                </tbody>
            </table>
        );
    }
}

export default Table;