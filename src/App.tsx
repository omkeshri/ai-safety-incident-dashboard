import { useState } from 'react'
import "./App.css"
import { IncidentCard } from './components/IncidentCard';
import ReportForm from './components/ReportForm';
import { Incident, mockData } from './utils/mockData';

const severityColor = {
  Low: "green",
  Medium: "gold",
  High: "red"
}

function App() {
  const [incidents, setIncidents] = useState<Incident[]>(mockData);
  const [severityFilter, setSeverityFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [viewDetailsId, setViewDetailsId] = useState<Set<number>>(new Set());
  const [isReporting, setIsReporting] = useState(false);

  const filteredIncidents = incidents.filter((incident) => {
    return severityFilter === "All" ? incidents :
      incident.severity === severityFilter;
  })

  const sortedIncidents = filteredIncidents.sort((a, b) => {
    return sortOrder === "Newest" ?
      new Date(b.reported_at).getTime() - new Date(a.reported_at).getTime() :
      new Date(a.reported_at).getTime() - new Date(b.reported_at).getTime()
  })

  const handleDetailsIdList = (id: number) => {
    const newSet = new Set(viewDetailsId);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setViewDetailsId(newSet);
  }

  const updateIncident = ({
    title,
    description,
    severity,
  }: {
    title: string;
    description: string;
    severity: "Low" | "Medium" | "High";
  }) => {

    const now = new Date();
    const reportedAtIST = now.toISOString().split('.')[0] + 'Z';
    const lastId = incidents[incidents.length - 1].id;

    const newIncident = {
      id: lastId + 1,
      title: title,
      description: description,
      severity: severity,
      reported_at: reportedAtIST,
    }
    const updatedIncidents = [...incidents, newIncident];
    setIncidents(updatedIncidents);
  }


  const handleReportIncident = () => {
    setIsReporting(true);
  }

  return (
    <div className='dashboard'>
      <div className="header">
        <h1>AI Safety Incident Dashboard</h1>
      </div>
      <div className="controls">
        <div className="sort-controls">
          <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)}>
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <select name="" id="" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value={"Newest"}>Newest First</option>
            <option value={"Oldest"}>Oldest First</option>
          </select>
        </div>

        <button className="report-btn" onClick={handleReportIncident}>
          Report Incident
        </button>
      </div>

      <section className="incident-list">
        {sortedIncidents.map((data) => {
          return (
            <div key={data.id}>
              <IncidentCard data={data} viewDetailsId={(id: number) => handleDetailsIdList(id)} viewDetailsList={viewDetailsId} severityColor={severityColor[data.severity]} />
            </div>
          )
        })}
      </section>



      {isReporting &&
        (<section className='report-section'>
          <ReportForm updateIncident={({ title, description, severity }) => updateIncident({ title, description, severity })} isReporting={() => setIsReporting(false)} />
        </section>)}
    </div>

  )
}

export default App
