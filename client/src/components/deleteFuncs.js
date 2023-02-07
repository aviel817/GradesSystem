export async function deleteGradeFunc(row)
{
    try
    {
        const currentPath = window.location.pathname
        const response = await fetch(currentPath+"/deleteGrade", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    "id": row.ID,
                    "type": row.Type
                }),
            credentials: "include"
        })

        if (response.status === 400)
        {
            alert('error: '+ await response.text())
        }
        else
        {
            alert('success: ' + await response.text())
        }
    } catch (err) {
        console.log(err)
    }
}

export async function deleteStudentFunc(row)
{
    try
    {
        const currentPath = window.location.pathname
        const response = await fetch(currentPath+"/deleteStudent", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    "id": row.ID
                }),
            credentials: "include"
        })

        if (response.status === 400)
        {
            alert('error: '+ await response.text())
        }
        else
        {
            alert('success: ' + await response.text())
        }
    } catch (err) {
        console.log(err)
    }
}