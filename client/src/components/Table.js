const Table = (props) => {
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
                    {row.map((col, k) => { 
                        return (<td key={k}>{col}</td>);
                    })}
                </tr>
                )})}
            </tbody>
        </table>
    );
}

export default Table;