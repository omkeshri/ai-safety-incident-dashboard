import React, { useEffect, useState } from 'react'
import { Incident } from '../utils/mockData';

interface Props {
    updateIncident: (data: {
        title: string;
        description: string;
        severity: string;
    }) => void;
    isReporting: () => void;
}

const ReportForm = ({ updateIncident, isReporting }: Props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [severity, setSeverity] = useState("");
    const [error, setError] = useState("Please verify the details before submitting an incident!")

    const handleIncidentSubmit = (e: any) => {
        e.preventDefault();
        try {
            if (title.length === 0 || description.length === 0) {
                throw new Error("Please fill out the empty fields!")
            }
            if (severity === "") throw new Error("Please choose the severity of the incident!")
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
                <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
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