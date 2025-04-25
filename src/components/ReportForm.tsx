import React, { useState } from 'react'
import { Incident } from '../utils/mockData';

interface Props {
    updateIncident: (data: {
        title: string;
        description: string;
        severity: string;
    }) => void;
}

const ReportForm = ({ updateIncident }: Props) => {
    const [severity, setSeverity] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleIncidentSubmit = () => {
        updateIncident({ title, description, severity });
    }

    return (
        <div className='report-form'>
            <label>
                Title:
                <input
                    type='text'
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <label>
                Description:
                <textarea
                    rows={10}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <label>
                Severity:
                <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
                    <option value="">High</option>
                    <option value="">Medium</option>
                    <option value="">Low</option>
                </select>
            </label>
            <button onClick={handleIncidentSubmit}>Submit</button>
        </div>
    )
}

export default ReportForm