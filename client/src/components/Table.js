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
                        }) }
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((row, i) => {
                    return (
                    <tr key={i}>
                        <td key={i}>{row.Num}</td>
                        <td key={i+1}>{row.Firstname}</td>
                        <td key={i+2}>{row.Lastname}</td>
                        <td key={i+3}>{row.Type}</td>
                        <td key={i+4}>{row.Grade}</td>
                        <td key={i+5}>{row.Date}</td>
                    </tr>
                    )})}
                </tbody>
            </table>
        );
    }
}

export default Table;