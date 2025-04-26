interface IncidentCardProps {
    data: {
        id: number;
        title: string;
        description: string;
        severity: "Low" | "Medium" | "High";
        reported_at: string;
    };
    viewDetailsId: (id: number) => void;
    viewDetailsList: Set<number>;
    severityColor: string;
}


export const IncidentCard = ({ data, viewDetailsId, viewDetailsList, severityColor }: IncidentCardProps) => {

    return (
        <div className={`incident-card ${viewDetailsList.has(data.id) ? 'open' : ''}`}>
            <div className='severity-color' style={{ backgroundColor: severityColor }}></div>

            <div className="incident-box">
                <div className="incident-content">
                    <h2>{data.title}</h2>
                    {viewDetailsList.has(data.id) && <p className='incident-description'>{data.description}</p>}
                    <p>Severity: <span style={{ color: severityColor }}>{data.severity}</span></p>
                    <p>Reported At:<span className='span-text'> {data.reported_at.split("T")[0]} {data.reported_at.split("T")[1].split("Z")[0]} UTC</span></p>
                </div>

                <button className="details-btn" onClick={() => viewDetailsId(data.id)}>{viewDetailsList.has(data.id) ? "Hide Details" : "View Details"}</button>
            </div>
        </div>
    )
}
