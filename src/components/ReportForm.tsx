import { useEffect, useState } from 'react'

interface Props {
    updateIncident: (data: {
        title: string;
        description: string;
        severity: "Low" | "Medium" | "High";
    }) => void;
    isReporting: () => void;
}

const ReportForm = ({ updateIncident, isReporting }: Props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [severity, setSeverity] = useState<"Low" | "Medium" | "High" | "">("");
    const [error, setError] = useState("Please verify the details before submitting an incident!")

    const handleIncidentSubmit = (e: any) => {
        e.preventDefault();
        try {
            if (title.length === 0 || description.length === 0) {
                throw new Error("Please fill out the empty fields!")
            }
            else if(description.length<10) throw new Error("Description must include atleast 10 letters!")
            else if (severity === "") throw new Error("Please choose the severity of the incident!")

            setError("Incident Submitted!")
            updateIncident({ title, description, severity });
            setTimeout(() => {
                isReporting();
            }, 1000);
        }
        catch (err: any) {
            setError(err.message);
        }

    }

    useEffect(() => {
        document.body.classList.add("modal-open")
        return () => { document.body.classList.remove("modal-open"); }
    }, [])
    
    return (
        <form className='report-form'>
            <button className="close-report-btn" onClick={() => isReporting()}>&#10006;</button>
            <h2>Report an Incident</h2>
            <label>
                Title:
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <label>
                Description:
                <textarea
                    rows={10}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <label>
                Severity:
                <select value={severity} onChange={(e) => setSeverity(e.target.value as "Low" | "Medium" | "High" | "")}>
                    <option value="">None</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </label>
            <p className='error'>&#10022; {error}</p>
            <button className='submit-btn' type='submit' onClick={(e) => handleIncidentSubmit(e)}>Submit</button>
        </form>
    )
}

export default ReportForm