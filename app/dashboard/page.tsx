import ChildDashboard from "./child-dashboard";
import FlyerDashboard from "./flyer-dashboard";


export default function DashboardPage(){
    return(
        <div className="max-w-screen-2xl mx-auto py-5">
            <h1 className="text-4xl font-semibold pb-5">Dashboard</h1>
            <div className="grid grid-cols-5 gap-5 max-w-full">
                <div className="col-span-3">
                    <ChildDashboard />
                </div>
                <div className="col-span2">
                    <FlyerDashboard />
                </div>
            </div>
            
        </div>
    )
}