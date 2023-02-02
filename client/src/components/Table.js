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
                        { props.headers.map((header, k) => {
                            return (<td key={i+k}>{row[header]}</td>)
                          })
                        }
                    </tr>
                    )})}
                </tbody>
            </table>
        );
    }
}

export default Table;