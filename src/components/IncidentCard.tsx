import React from 'react';

interface IncidentCardProps {
    data: {
        id: number;
        title: string;
        description: string;
        severity: "Low" | "Medium" | "High";
        reported_at: string;
    };
    viewDetailsId: (id: number) => void;
    viewDetails: Set<number>;
    severityColor: string;
}


export const IncidentCard = ({ data, viewDetailsId, viewDetails, severityColor }: IncidentCardProps) => {
    return (
        <div className='incident-card'>
            <div className='severity-color' style={{ backgroundColor: severityColor }}></div>
            <div className="incident-box">
                <div className="incident-content">
                    <h2>{data.title}</h2>
                    <p>{data.severity}</p>
                    <p>{data.reported_at.split("T")[0]} {data.reported_at.split("T")[1].split("Z")[0]}UTC</p>
                    {viewDetails.has(data.id) && <p className='incident-description'>{data.description}</p>}
                </div>
                <button className="btn" onClick={() => viewDetailsId(data.id)}>View Details</button>
            </div>
        </div>
    )
}
