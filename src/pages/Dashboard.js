import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import DataTable from "../components/table"
import PieChartComponent from "../components/chart";
import LeaveModal from "../components/modal"
import LeaveApi from "../service/leaveapi";
import "../assets/css/dashboard.css"

function Dashboard(params) {
  const [showModal, setShowModal] = useState(false)
  const [Leavedata, setLeavedata] = useState([])
  const [summary, setSummary] = useState({})

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const columns = [
    { header: "Employee Name", accessor: "employeeName" },
    { header: "Sick Leaves", accessor: "sickLeave" },
    { header: "Earned Leaves", accessor: "earnedLeave" },
    { header: "Casual Leaves", accessor: "casualLeave" },
    { header: "Total No. of Leaves", accessor: "totalLeave" },
    { header: "Total No. of Availed Leaves", accessor: "totalUsedLeaves" },
    { header: "Balance", accessor: "availLeave" },
  ];
  const handleSave = async (formData) => {
    await LeaveApi.createLeave(formData).then((res) => {
      alert("Leave applied successfully")
      listAll()
    }).catch((err) => {
      alert(`Error in apply leave`)
    })
  };

  const listleaves = async () => {
    await LeaveApi.getleaves().then((res) => {
      if (res.status == 200) {
        setLeavedata(res.data)
      } else {
        setLeavedata([])
      }
    }).catch((err) => {
      console.log(err)
    })

  }

  const ListSummary = async () => {
    await LeaveApi.getSummary().then((res) => {
      if (res.status == 200) {
        setSummary(res.data)
      } else {
        setSummary({})
      }
    }).catch((err) => {
      console.log(err)
    })

  }
  const listAll = () => {
    listleaves()
    ListSummary()
  }
  useEffect(() => {
    listAll()
  }, [])

  return (
    <div className="Dashboard">
      <h2>Dashboard:</h2>
      <div className="text-end mb-3">
        <Button variant="primary" onClick={handleOpen}>
          Apply Leave
        </Button>
      </div>
      <div className="datatable">
        {Leavedata.length?<DataTable data={Leavedata} columns={columns} />:<h3>No data found</h3>}
      </div>
      <div className="container mt-5">
        <LeaveModal
          show={showModal}
          handleClose={handleClose}
          handleSave={handleSave}
        />
      </div>
      <div className="leave-chart">
      {Object.keys(summary).length?<PieChartComponent datas={summary} />:<h3>No data found</h3>}
      </div>
    </div>
  )
}

export default Dashboard